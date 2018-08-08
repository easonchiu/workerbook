import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import ChartDepartmentSummary from 'src/components/chartDepartmentSummary'
import ChartMission from 'src/components/chartMission'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  async componentDidMount() {
    await this.evt.fetchData()
    if (this.summaryChart) {
      this.summaryChart.$fill()
    }
  }

  renderEachUser = (detail = { missions: [] }) => {
    const chartData = detail.missions.filter(i => i.data.length > 0)
    const waitData = detail.missions.filter(i => i.data.length === 0)
    return (
      <div className="user-chart" key={detail.id}>
        <header>
          <h2>{detail.nickname}</h2>
          <span>{detail.title}</span>
          <div className="wait">
            <p>待执行任务：3个</p>
          </div>
        </header>
        {
          chartData.map((data = { data: [] }) => {
            if (!data.id || !data.data.length) {
              return null
            }
            return [
              <div key={'mission-title-' + data.id} className="missions">
                <div className="mission">
                  <sub style={{ background: '#63a5e2' }} />
                  <p>{data.projectName} {data.name}</p>
                  <time>
                    <span>截至时间</span>
                    {new Date(data.deadline).format('yyyy-MM-dd')}
                  </time>
                </div>
              </div>,
              <ChartMission
                key={'mission-chart-' + data.id}
                source={data}
              />
            ]
          })
        }
        {
          waitData.map(data => {
            return (
              <div key={data.id}>
                {data.name}
              </div>
            )
          })
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
            source={summary}
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
