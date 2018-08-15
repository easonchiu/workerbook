import './style'
import React from 'react'
import HighCharts from 'highcharts'


class Chart extends React.PureComponent {

  // 算出x轴的天跨度
  getCategories = (mission, today) => {
    if (!mission.length || !today) {
      return []
    }
    const D = 'T23:59:59+08:00'
    let d1 = mission[0].day

    // 只允许2006-01-02格式
    const reg = /^\d{4}(-\d{2}){2}$/
    if (!(reg).test(d1) || !(reg).test(today)) {
      return
    }

    // 第一天往前移一天
    const first = new Date(d1 + D)
    first.setHours(-24)

    // 日期范围
    const range = [first, new Date(today + D)]

    // 填充每一天
    const categories = []
    const r = (range[1] - range[0]) / 1000 / 60 / 60 / 24
    let day = range[0]
    categories.push(day)
    if (r) {
      for (let i = 1; i < r; i++) {
        categories.push(new Date((day - 0) + 1000 * 60 * 60 * 24 * i))
      }
    }
    return categories
  }

  // 获取x的数据内容
  getSeries = (data, categories) => {
    if (!data || !data.length || !categories || !categories.length) {
      return []
    }
    categories = categories.map(i => i.format('yyyy-MM-dd'))
    const series = new Array(categories.length).fill(0)
    data.forEach(item => {
      if (item && item.day && item.progress) {
        const index = categories.indexOf(item.day)
        series[index] = item.progress
      }
    })
    // 补全空档的那些天，用前一天的数据填充
    series.forEach((i, index) => {
      if (series[index + 1] === 0 && i !== 0) {
        series[index + 1] = i
      }
    })
    return series
  }

  // 渲染chart
  renderMissionChart = chart => {
    const categories = this.getCategories(chart.data, chart.today)
    if (!categories.length) {
      return null
    }
    const series = this.getSeries(chart.data, categories)
    if (!series.reduce((a, b) => a + b)) {
      return
    }
    const categoriesStr = categories.map(i => i.format('M/d'))
    const plotLinesValue = categoriesStr.indexOf(new Date(chart.deadline).format('M/d'))
    return HighCharts.chart('mission-chart-' + chart.id, {
      chart: {
        type: 'area'
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories,
        showFirstLabel: false,
        title: {
          enabled: false
        },
        plotLines: [{
          color: '#ff6600',
          width: 1,
          value: plotLinesValue,
          zIndex: 5,
          label: {
            text: '截止线',
            align: 'right',
            x: -10,
            y: 20,
            rotation: 0,
            style: {
              color: '#ff6600',
            }
          }
        }],
        tickWidth: 0,
        lineColor: '#dee3e8',
        lineWidth: 1,
        labels: {
          style: {
            color: '#586069',
            fontSize: 12,
          },
          step: Math.ceil(Math.min(series.length, 35) / 5),
          formatter: function () {
            return this.value.format('M/d')
          }
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        tickPositions: [0, 25, 50, 75, 100],
        gridLineColor: '#dee3e8',
        gridLineDashStyle: 'Dash',
        lineColor: '#dee3e8',
        lineWidth: 1,
        labels: {
          style: {
            color: '#a8b0b9',
            fontSize: 12,
          },
          format: '{value} %'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderWidth: 0,
        borderRadius: 5,
        shadow: false,
        padding: 10,
        distance: 20,
        style: {
          color: '#fff',
          lineHeight: 20,
        },
        shared: true,
        formatter: function () {
          const p = this.points[0]
          if (p.point.index === 0) {
            const t = new Date(chart.createTime).format('M/d')
            return `<span style="color: #999;">创建于：${t}</span>`
          }
          // let deadline = chart.deadline
          // if (deadline) {
          //   deadline = new Date(deadline)
          //   console.log(deadline < this.x)
          // }
          const t = this.x.format('M/d')
          const hd = `<span style="font-size: 10px">日期：${t}</span><br/>`
          let progress = this.y < 100 ?
            `<b>${this.y} %</b>` :
            `<span style="color:#33b400;font-weight:bold;">完成</span>`
          const bd = `<span style="color:${p.color}">\u25CF</span> 进度: ${progress}`
          return hd + bd
        }
      },
      colors: [
        // '#ff0035',
        // '#ff8900',
        // '#88d52c',
        // '#00d1d1',
        '#0090f3',
        // '#8037ff',
      ],
      plotOptions: {
        area: {
          fillOpacity: 0.4,
          lineColor: 'rgba(0,0,0,0)',
          lineWidth: 0,
          marker: {
            lineWidth: 4,
            radius: 0,
            symbol: 'circle',
          },
          animation: {
            duration: 250
          }
        }
      },
      series: [{
        name: chart.name,
        showInLegend: false,
        data: series,
      }]
    })
  }

  componentDidMount() {
    const chart = this.props.source || {}
    if (chart.id) {
      this.$chart = this.renderMissionChart(chart)
    }
  }

  componentWillUnmount() {
    if (this.$chart && this.$chart.destroy) {
      this.$chart.destroy()
    }
  }

  render() {
    if (!this.props.source || !this.props.source.id) {
      return null
    }
    return (
      <div
        className="wb-mission-chart"
        id={'mission-chart-' + this.props.source.id}
      >
        暂无数据
      </div>
    )
  }
}

export default Chart