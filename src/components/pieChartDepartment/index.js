import './style'
import React from 'react'
import HighCharts from 'highcharts'

import Button from 'src/components/button'

class PirChartDepartment extends React.PureComponent {

  // 部门图表的配置
  chartConf = data => {
    data = data.filter(item => item[1] !== 0)
    let colors = data.map(item => item[2])
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
          color: '#586069',
        }
      },
      colors: colors,
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

  // 渲染项目图表
  renderChart = (id, data) => {
    if (data.length === 0) {
      return
    }
    const chartData = [
      ['未开始', 0, 'rgb(230, 230, 30)'],
      ['进行中', 0, '#5081ff'],
      ['已延期', 0, '#ff7700'],
      ['已完成', 0, 'rgb(134, 212, 50)'],
    ]
    data.forEach(item => {
      // 已延期任务+1
      if (item.isDelay) {
        chartData[2][1] += 1
      }
      // 待执行任务+1
      else if (item.progress === 0) {
        chartData[0][1] += 1
      }
      // 已完成任务+1
      else if (item.progress === 100) {
        chartData[3][1] += 1
      }
      // 进行中任务+1
      else {
        chartData[1][1] += 1
      }
    })
    return HighCharts.chart(id, this.chartConf(chartData), function (c) {
      // 环形图圆心
      let centerY = c.series[0].center[1]
      let titleHeight = parseInt(c.title.styles.fontSize, 10)
      // 动态设置标题位置
      c.setTitle({
        y: centerY + titleHeight / 2
      })
    })
  }

  componentDidMount() {
    const data = this.props.source
    this.$chart = this.renderChart('chart' + data.id, data.missions || [])
  }

  componentWillUnmount() {
    if (this.$chart && this.$chart.destroy) {
      this.$chart.destroy()
    }
  }

  render() {
    const data = this.props.source
    return (
      <div key={data.id} className="wb-pie-chart-department">
        <header className="header clearfix">
          <h2>{data.name}</h2>
          <span>人数：{data.count}</span>
        </header>
        <div className="chart" id={'chart' + data.id}>
          暂无任务数据
        </div>
        <Button
          light
          className="detail"
          onClick={() => {
            this.props.onClick && this.props.onClick(data.id)
          }}
        >
          详情
        </Button>
      </div>
    )
  }
}

export default PirChartDepartment