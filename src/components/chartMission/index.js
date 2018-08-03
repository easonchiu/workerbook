import React from 'react'
import HighCharts from 'highcharts'


class Chart extends React.PureComponent {

  // 渲染chart
  renderMissionChart = chart => {
    return HighCharts.chart('mission-chart-' + this.props.id, {
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
        categories: ['3/15', '3/16', '3/17', '3/18', '3/19', '3/20', '3/21'],
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        },
        plotLines: [{
          color: '#ff9900',
          width: 2,
          value: 5,
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
        name: '套餐下单h5修改',
        showInLegend: false,
        data: [null, 5, 10, 20, 25, 5, 100]
      }]
    })
  }

  componentDidMount() {
    const chart = this.props.source || {}
    // if (chart.id) {
    this.$chart = this.renderMissionChart(chart)
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
      <div id={'mission-chart-' + this.props.id} style={{ height: '150px' }}>
        暂无任务数据
      </div>
    )
  }
}

export default Chart