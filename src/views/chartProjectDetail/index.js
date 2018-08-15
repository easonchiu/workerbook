import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import ChartProjectSummary from 'src/components/chartProjectSummary'
import ChartMission from 'src/components/chartMission'
import UserHeader from 'src/components/userHeader'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  async componentDidMount() {
    await this.evt.fetchData()

    // 加载图表
    setTimeout(() => {
      if (this.summaryChart) {
        const data = this.props.analytics$.project.detail || { missions: [] }
        this.summaryChart.$fill(data)
      }
    })
  }

  renderEachMission(detail = {}) {
    const user = detail.user || {}
    return (
      <div key={detail.id} className="mission-chart">
        <header className="header">
          <UserHeader mini name={user.nickname} id={user.id} />
          <div className="info">
            <h2>{detail.name}</h2>
            <time>截止时间：{new Date(detail.deadline).format('yyyy-MM-dd')}</time>
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
            <span>项目进度 {summary.progress}%</span>
            <div className="deadline">
              <p>项目截止时间</p>
              <time className={summary.isTimeout ? 'timeout' : ''}>
                {new Date(summary.deadline).format('yyyy-MM-dd')}
              </time>
            </div>
          </header>
          <ChartProjectSummary
            id={summary.id}
            ref={r => { this.summaryChart = r }}
          />
        </div>
      </div>
    )
  }

  render() {
    const detail = this.props.analytics$.project.detail || { missions: [] }
    if (detail.missions.length > 1) {
      const D = 'T23:59:59+08:00'
      detail.missions.sort((a, b) => {
        if (!a.data || !b.data) {
          return -1
        }
        const fa = a.data[0] ? a.data[0].day : ''
        const fb = b.data[0] ? b.data[0].day : ''
        if (!fa) {
          return 1
        }
        else if (!fb) {
          return -1
        }
        const da = new Date(fa + D)
        const db = new Date(fb + D)
        return da > db ? -1 : 1
      })
    }
    return (
      <div className="view-project-chart">
        {this.renderSummary(detail)}
        <div className="body clearfix">
          {
            detail.missions.map(item => this.renderEachMission(item))
          }
        </div>
      </div>
    )
  }
}
