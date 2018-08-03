import HighCharts from 'highcharts'

export default class Event {

  // 获取首页需要的数据
  fetchData = async () => {
    this.render()
  }

  render = () => {
    HighCharts.chart('summary-chart', {
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
        name: '订单详情页面修改',
        data: [null, null, null, null, null, 5, 100]
      }, {
        name: '前端页面开发',
        data: [null, null, null, null, 25, 50, 100]
      }, {
        name: '原型设计',
        data: [null, null, 15, 30, 40, 60, 100]
      }, {
        name: '接口开发',
        data: [null, 5, 30, 35, 50, 80, 100]
      }, {
        name: '测试及上线',
        data: [null, 5, 15, 30, 35, 50, 100]
      }]
    })
  }

}