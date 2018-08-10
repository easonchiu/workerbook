import './style'
import React from 'react'
import HighCharts from 'highcharts'

class Chart extends React.PureComponent {
  // 算出x轴的天跨度
  getCategories = data => {
    const missions = data.missions || []
    if (!missions.length) {
      return []
    }
    const D = 'T23:59:59+08:00'
    const range = []

    missions.forEach(item => {
      let data = item.data
      if (!data || !data.length) {
        return
      }

      // 日期从小到大排序
      data.sort((a, b) => {
        const d1 = new Date(a.day + D)
        const d2 = new Date(b.day + D)
        return d1 < d2 ? -1 : 1
      })

      const d1 = data[0].day
      const d2 = data[item.data.length - 1].day

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
    })
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
    const series = []
    data.forEach(item => {
      const d = {
        name: item.name,
        data: new Array(categories.length).fill(0),
      }
      if (item.data && item.data.length) {
        item.data.forEach(i => {
          const index = categories.indexOf(i.day)
          if (index !== -1) {
            d.data[index] = i.progress
          }
        })
        d.data.forEach((i, index) => {
          if (d.data[index + 1] === 0 && i !== 0) {
            d.data[index + 1] = i
          }
        })
      }
      series.push(d)
    })
    if (series.length > 1) {
      // 排序，最先有数据的排在最下方
      series.sort((a, b) => {
        let na = 0
        for (let i = 0; 0 < a.data.length; i++) {
          if (a.data[i] === 0) {
            na += 1
          }
          else {
            break
          }
        }
        let nb = 0
        for (let i = 0; 0 < b.data.length; i++) {
          if (a.data[i] === 0) {
            nb += 1
          }
          else {
            break
          }
        }
        return na - nb < 0 ? 1 : -1
      })
    }
    return series
  }

  // 渲染chart
  renderSummaryChart = chart => {
    const missions = chart.missions || []
    if (!missions.length) {
      return null
    }
    const categories = this.getCategories(chart)
    if (!categories.length) {
      return null
    }
    const categoriesStr = categories.map(i => i.format('M/d'))
    const series = this.getSeries(missions, categories)
    const tickPositions = []
    const step = 100 / (missions.length)
    for (let i = 0; i < missions.length; i++) {
      tickPositions.push(Math.round((i * step) * 100) / 100)
    }
    tickPositions.push(100)
    const plotLinesValue = categoriesStr.indexOf(new Date(chart.deadline).format('M/d'))
    return HighCharts.chart('summary-chart-' + chart.id, {
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
          color: 'rgba(0,0,0,0.02)',
          zIndex: 0,
        },
        categories: categoriesStr,
        tickmarkPlacement: 'on',
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
        labels: {
          style: {
            color: '#586069',
            fontSize: 12,
          },
          step: 7,
        }
      },
      yAxis: [{
        visible: false,
        crosshair: {
          width: 1,
          color: 'rgba(0,0,0,0.3)',
        },
        tickPositions: [0, missions.length * 100],
      }, {
        title: {
          text: ''
        },
        tickPositions: tickPositions,
        gridLineColor: '#dee3e8',
        gridLineDashStyle: 'Dash',
        labels: {
          enabled: false
        }
      }, {
        title: {
          text: ''
        },
        tickPositions: [0, 25, 50, 75, 100],
        gridLineWidth: 0,
        lineColor: '#dee3e8',
        lineWidth: 1,
        labels: {
          style: {
            color: '#a8b0b9',
            fontSize: 12,
          },
          format: '{value} %',
        }
      }],
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
      colors: [
        '#ff0035',
        '#ff8900',
        '#88d52c',
        '#00d1d1',
        '#0090f3',
        '#8037ff',
      ],
      plotOptions: {
        area: {
          fillOpacity: 0.4,
          hover: {
            opacity: 0.1,
          },
          lineColor: 'rgba(0,0,0,0)',
          stacking: 'normal',
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
      series: series
    })
  }

  $fill(chart) {
    if (chart.missions && chart.missions.length) {
      this.setState({})
      this.$chart = this.renderSummaryChart(chart)
    }
  }

  componentWillUnmount() {
    if (this.$chart && this.$chart.destroy) {
      this.$chart.destroy()
    }
  }

  render() {
    return (
      <div
        className="wb-project-summary-chart"
        id={'summary-chart-' + this.props.id}
      >
        暂无数据
      </div>
    )
  }
}

export default Chart