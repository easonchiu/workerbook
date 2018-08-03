import './style'
import React from 'react'
import HighCharts from 'highcharts'

import Button from 'src/components/button'

class PirChartProject extends React.PureComponent {

  // 项目图表的配置
  chartConf = (progress, isDelay) => {
    const addonTitle = isDelay ?
      '<br><span style="color:#ff6600;font-size:12px;">已延期</span>' : ''
    return {
      credits: {
        enabled: false
      },
      title: {
        floating: true,
        text: '进度：' + progress + '%' + addonTitle,
        style: {
          fontSize: 14,
          color: '#586069',
        }
      },
      colors: ['#5081ff', '#f7f9fc'],
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          enableMouseTracking: false,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        type: 'pie',
        innerSize: '80%',
        data: [progress, 100 - progress],
      }]
    }
  }

  // 渲染项目图表
  renderChart = (id, progress, isDelay) => {
    return HighCharts.chart(id, this.chartConf(progress, isDelay), function (c) {
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
    this.$chart = this.renderChart('chart' + data.id, data.progress, data.isDelay)
  }

  componentWillUnmount() {
    if (this.$chart && this.$chart.destroy) {
      this.$chart.destroy()
    }
  }

  render() {
    const data = this.props.source
    const missionsCount = data.missions ? data.missions.length : 0
    return (
      <div key={data.id} className="wb-pie-chart-project">
        <header className="header clearfix">
          <h2>{data.name}</h2>
          <span>任务数：{missionsCount}</span>
        </header>
        <div className="chart" id={'chart' + data.id}>
          暂无项目数据
        </div>
        <p className="info">
          <span><em>截止时间</em>{new Date(data.deadline).format('yyyy-MM-dd')}</span>
          <span><em>已用时</em>{data.costDay}天</span>
          <span><em>剩余</em>{data.totalDay - data.costDay}天</span>
        </p>
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

export default PirChartProject