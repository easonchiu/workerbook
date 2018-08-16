import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import ChartDepartmentSummary from 'src/components/chartDepartmentSummary'
import ChartMission from 'src/components/chartMission'
import UserHeader from 'src/components/userHeader'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  async componentDidMount() {
    await this.evt.fetchData()
    if (this.summaryChart) {
      const data = this.props.analytics$.department.summary || {}
      this.summaryChart.$fill(data)
    }
  }

  renderEachUser = (data = { missions: [] }) => {
    const chartData = data.missions.filter(i => i.data.length > 0)
    const waitData = data.missions.filter(i => i.data.length === 0)
    return (
      <div className="user-chart" key={data.id}>
        <header className="header clearfix">
          <UserHeader
            mini
            name={data.nickname}
            id={data.id}
          />
          <div className="info">
            <h2>{data.nickname}</h2>
            <span>{data.title}</span>
          </div>
        </header>
        <div className="missions clearfix">
          {
            chartData.map((data = { data: [] }) => {
              if (!data.id || !data.data.length) {
                return null
              }
              return (
                <div className="item" key={'mission-chart-' + data.id}>
                  <header className="header clearfix">
                    <div className="name">
                      <h3>{data.project.name}</h3>
                      <p>{data.name}</p>
                    </div>
                    <div className="info">
                      <span>任务进度：{data.progress}%</span>
                      <time>
                        截至时间：{new Date(data.deadline).format('yyyy-MM-dd')}
                      </time>
                    </div>
                  </header>
                  <ChartMission
                    id={data.id}
                    ref={r => {
                      if (r) {
                        r.$fill && r.$fill(data)
                      }
                    }}
                  />
                </div>
              )
            })
          }
          {
            waitData.map(data => {
              return (
                <div className="item" key={data.id}>
                  <header className="header clearfix">
                    <div className="name">
                      <h3>{data.project.name}</h3>
                      <p>{data.name}</p>
                    </div>
                    <div className="info">
                      <span>任务进度：未开始</span>
                      <time>
                        截至时间：{new Date(data.deadline).format('yyyy-MM-dd')}
                      </time>
                    </div>
                  </header>
                  <div className="empty">任务未开始</div>
                </div>
              )
            })
          }
        </div>
        {
          !chartData.length && !waitData.length ?
            <div className="empty">暂无任务</div> :
            null
        }
      </div>
    )
  }

  renderSummary(summary) {
    return (
      <div className="summary">
        <div className="inner">
          <header>
            <h1>{summary.name}</h1>
            <span>任务汇总</span>
          </header>
          <ChartDepartmentSummary
            id={summary.id}
            ref={r => { this.summaryChart = r }}
          />
        </div>
      </div>
    )
  }

  render(props, state) {
    const summary = this.props.analytics$.department.summary || {}
    const detail = this.props.analytics$.department.detail || []
    return (
      <div className="view-department-chart">
        {this.renderSummary(summary)}
        <div className="body clearfix">
          {
            detail.map(item => this.renderEachUser(item))
          }
        </div>
      </div>
    )
  }
}
