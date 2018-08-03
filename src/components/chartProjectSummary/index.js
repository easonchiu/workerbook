import React from 'react'
import HighCharts from 'highcharts'


class Chart extends React.PureComponent {

  // 渲染chart
  renderSummaryChart = chart => {
    return HighCharts.chart('summary-chart-xxx', {
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
        categories: ['3/15', '3/16', '3/17', '3/18', '3/19', '3/20', '3/21', '3/22', '3/23', '3/24'],
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        },
        plotLines: [{
          color: '#ff9900',
          width: 2,
          value: 8,
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
      yAxis: [{
        visible: false,
        crosshair: {
          width: 1,
          color: '#5081ff90',
        },
        tickPositions: [0, 500],
      }, {
        title: {
          text: ''
        },
        tickPositions: [0, 20, 40, 60, 80, 100],
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
        name: 'Bug修复',
        data: [null, null, null, null, null, 5, 30, 80, 100, 100]
      }, {
        name: '测试',
        data: [null, null, null, null, null, 20, 50, 100, 100, 100]
      }, {
        name: '接口联调',
        data: [null, null, null, 20, 50, 100, 100, 100, 100, 100]
      }, {
        name: '前端页面开发',
        data: [null, null, 5, 50, 100, 100, 100, 100, 100, 100],
      }, {
        name: '接口开发',
        data: [null, 5, 30, 100, 100, 100, 100, 100, 100, 100]
      }]
    })
  }

  componentDidMount() {
    const chart = this.props.source || {}
    // if (chart.id) {
    this.$chart = this.renderSummaryChart(chart)
    // }
  }

  componentWillUnmount() {
    if (this.$chart && this.$chart.destroy) {
      this.$chart.destroy()
    }
  }

  render() {
    // const chart = this.props.source || {}
    return (
      <div id={'summary-chart-xxx'} style={{ height: '350px' }}>
        暂无项目数据
      </div>
    )
  }
}

export default Chart