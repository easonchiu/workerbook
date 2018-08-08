import React from 'react'
import HighCharts from 'highcharts'


class Chart extends React.PureComponent {

  // 算出x轴的天跨度
  getCategories = mission => {
    if (!mission.length) {
      return []
    }
    const D = 'T23:59:59+08:00'
    const range = []

    // 日期排序
    mission.sort((a, b) => {
      const d1 = a.day.replace(/-/g, '')
      const d2 = b.day.replace(/-/g, '')
      return d1 > d2
    })

    const d1 = mission[0].day
    const d2 = mission[mission.length - 1].day

    // 只允许2006-01-02格式
    const reg = /^\d{4}(-\d{2}){2}$/
    if (!(reg).test(d1) || !(reg).test(d2)) {
      return
    }

    const first = new Date(d1 + D)
    const last = new Date(d2 + D)
    if (!range[0] || first < range[0]) {
      range[0] = first
    }
    if (!range[1] || last > range[1]) {
      range[1] = last
    }

    const categories = []
    if (range[0] && range[1]) {
      const r = (range[1] - range[0]) / 1000 / 60 / 60 / 24
      let day = range[0]
      categories.push(day)
      if (r) {
        for (let i = 1; i < r; i++) {
          categories.push(new Date((day - 0) + 1000 * 60 * 60 * 24 * i))
        }
        categories.push(range[1])
      }
    }
    return categories
  }

  // 获取x的每条数据内容
  getSeries = (data, categories) => {
    if (!data || !data.length || !categories || !categories.length) {
      return []
    }
    categories = categories.map(i => i.format('yyyy-MM-dd'))
    const series = new Array(categories.length).fill(null)
    data.forEach(item => {
      if (item && item.day && item.progress) {
        const index = categories.indexOf(item.day)
        if (index !== -1) {
          series[index] = item.progress
        }
      }
    })
    return series
  }

  // 渲染chart
  renderMissionChart = chart => {
    const categories = this.getCategories(chart.data)
    if (!categories.length) {
      return null
    }
    const categoriesStr = categories.map(i => i.format('M/d'))
    const series = this.getSeries(chart.data, categories)
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
        crosshair: {
          color: '#5081ff10',
        },
        categories: categoriesStr,
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        },
        plotLines: [{
          color: '#ff9900',
          width: 2,
          value: plotLinesValue,
        }],
        tickWidth: 0,
        lineColor: '#dee3e8',
        lineWidth: 1,
        labels: {
          style: {
            color: '#586069',
            fontSize: 12,
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
        valueSuffix: ' %'
      },
      // colors: ['rgb(230, 230, 30)', '#ff7700', '#5081ff', 'rgb(200, 100, 200)', '#00bb88'],
      plotOptions: {
        area: {
          stacking: 'normal',
          lineWidth: 0,
          marker: {
            lineWidth: 0,
            radius: 0,
            symbol: 'circle'
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
      <div id={'mission-chart-' + this.props.source.id} style={{ height: '150px' }} />
    )
  }
}

export default Chart