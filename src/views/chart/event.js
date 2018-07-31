import fetcher from 'src/utils/fetcher'
import HighCharts from 'highcharts'

export default class Event {

  // 获取首页需要的数据
  fetchData = async () => {
    await fetcher.one(this.props.$chart.fetchDepartmentsSummary)
  }

  chartConf = data => {
    data = data.filter(item => item[1] !== 0)
    let number = 0
    data.forEach(i => {
      number += i[1]
    })
    return {
      credits: {
        enabled: false
      },
      title: {
        floating: true,
        text: '任务数：' + number,
        style: {
          fontSize: 14,
        }
      },
      // 待执行，已延期，进行中，已完成
      colors: ['rgb(230, 230, 30)', '#ff7700', '#5081ff', 'rgb(134, 212, 50)'],
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
        pie: {
          allowPointSelect: false,
          dataLabels: {
            crop: false,
            distance: 10,
            style: {
              color: '#586069',
              fontSize: 12,
            }
          }
        }
      },
      series: [{
        type: 'pie',
        innerSize: '80%',
        name: '任务数',
        data: data,
      }]
    }
  }

  renderDepartmentChart = (id, data) => {
    if (data.length === 0) {
      return
    }
    const chartData = [
      ['待执行', 0],
      ['已延期', 0],
      ['进行中', 0],
      ['已完成', 0],
    ]
    data.forEach(item => {
      // 已延期任务+1
      if (item.isTimeout) {
        chartData[1][1] += 1
      }
      // 未开始任务+1
      else if (item.progress === 0) {
        chartData[0][1] += 1
      }
      // 已完成任务+1
      else if (item.progress === 100) {
        chartData[3][1] += 1
      }
      // 进行中任务+1
      else {
        chartData[2][1] += 1
      }
    })
    HighCharts.chart(id, this.chartConf(chartData), function (c) {
      // 环形图圆心
      let centerY = c.series[0].center[1]
      let titleHeight = parseInt(c.title.styles.fontSize, 10)
      // 动态设置标题位置
      c.setTitle({
        y: centerY + titleHeight / 2
      })
    })
  }
}