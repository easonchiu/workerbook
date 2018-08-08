import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import ChartProjectSummary from 'src/components/chartProjectSummary'
import ChartMission from 'src/components/chartMission'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  async componentDidMount() {
    await this.evt.fetchData()

    // 加载图表
    setTimeout(() => {
      if (this.summaryChart) {
        const data = this.props.analytics$.project.summary || { missions: [] }
        this.summaryChart.$fill(data)
      }
    })
  }

  renderEachMission(detail = { missions: [] }) {
    return (
      <div key={detail.id} className="mission-chart">
        <header className="header">
          <h2>{detail.name}</h2>
          <div className="user">
            <p>执行人：张三</p>
            <span>截至时间：{new Date(detail.deadline).format('yyyy-MM-dd')}</span>
          </div>
        </header>
        <ChartMission source={detail} />
      </div>
    )
  }

  renderSummary(summary) {
    return (
      <div className="summary">
        <div className="inner">
          <header className="header">
            <h1>{summary.name}</h1>
            <span>项目进度</span>
          </header>
          <ChartProjectSummary
            id={summary.id}
            ref={r => { this.summaryChart = r }}
          />
        </div>
      </div>
    )
  }

  render(props, state) {
    const summary = this.props.analytics$.project.summary || { missions: [] }
    let detail = this.props.analytics$.project.detail || []
    if (detail.length > 1) {
      detail.sort((a, b) => {
        return a.data.length - b.data.length <= 0 ? -1 : 1
      })
    }
    return (
      <div className="view-project-chart">
        {this.renderSummary(summary)}
        <div className="body clearfix">
          {
            detail.map(item => this.renderEachMission(item))
          }
        </div>
      </div>
    )
  }
}
