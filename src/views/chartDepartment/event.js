import fetcher from 'src/utils/fetcher'
import HighCharts from 'highcharts'

export default class Event {

  // 获取首页需要的数据
  fetchData = async () => {
    const id = this.props.match.params.id
    await fetcher.one(this.props.$chart.fetchOneDepartmentSummary, id)
    this.renderSummaryChart()
  }

  // 渲染顶部chart
  renderSummaryChart = () => {
    const chart = this.props.chart$.oneDepartmentSummary || {}
    const list = chart.list || []
    const X = [] // 横坐标，用户名
    const Y = [[], [], [], []] // 纵坐标，任务
    list.forEach((item, index) => {
      X.push(item.nickname)
      Y[0].push(0)
      Y[1].push(0)
      Y[2].push(0)
      Y[3].push(0)
      item.missions.forEach(item => {
        // 已延期任务+1
        if (item.isTimeout) {
          Y[1][index] += 1
        }
        // 未开始任务+1
        else if (item.progress === 0) {
          Y[0][index] += 1
        }
        // 已完成任务+1
        else if (item.progress === 100) {
          Y[3][index] += 1
        }
        // 进行中任务+1
        else {
          Y[2][index] += 1
        }
      })
    })
    HighCharts.chart('summary-chart', {
      chart: {
        type: 'column',
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: X,
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
      // 待执行，已延期，进行中，已完成
      colors: ['rgb(230, 230, 30)', '#ff7700', '#5081ff', 'rgb(134, 212, 50)'],
      yAxis: {
        allowDecimals: false, // 没有小数
        min: 0,
        title: {
          text: ''
        },
        gridLineColor: '#dee3e8',
        gridLineDashStyle: 'Dash',
        lineColor: '#dee3e8',
        lineWidth: 1,
        labels: {
          style: {
            color: '#a8b0b9',
            fontSize: 12,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderWidth: 0,
        borderRadius: 5,
        shadow: false,
        padding: 10,
        style: {
          color: '#fff',
          lineHeight: 20,
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          animation: {
            duration: 250
          }
        }
      },
      series: [{
        name: '未开始',
        data: Y[0],
        maxPointWidth: 5,
      }, {
        name: '已延期',
        data: Y[1],
        maxPointWidth: 30,
      }, {
        name: '执行中',
        data: Y[2],
        maxPointWidth: 30,
      }, {
        name: '已完成(未归档)',
        data: Y[3],
        maxPointWidth: 30,
      }]
    })
  }

}
