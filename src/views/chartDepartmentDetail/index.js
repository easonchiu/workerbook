import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import ChartDepartmentSummary from 'src/components/chartDepartmentSummary'
import ChartUser from 'src/components/chartUser'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  async componentDidMount() {
    await this.evt.fetchData()
    if (this.summaryChart) {
      this.summaryChart.$fill()
    }
  }

  renderEachUser() {
    return (
      <div className="user-chart">
        <header>
          <h2>张小三</h2>
          <span>前端开发工程师</span>
          <div className="wait">
            <p>待执行任务：3个</p>
          </div>
        </header>

        <div className="missions">
          <div className="mission">
            <sub style={{ background: '#63a5e2' }} />
            <p>套餐下单h5修改</p>
          </div>
        </div>

        <ChartUser source={{}} id={1} />

        <div className="missions">
          <div className="mission">
            <sub style={{ background: '#86da73' }} />
            <p>套餐下单h5修改</p>
          </div>
        </div>

        <ChartUser source={{}} id={2} />

        <div className="missions">
          <div className="mission">
            <sub style={{ background: '#c7b3ff' }} />
            <p>套餐下单h5修改</p>
          </div>
        </div>

        <ChartUser source={{}} id={3} />
      </div>
    )
  }

  renderSummary() {
    const summary = this.props.analytics$.department.summary || {}
    return (
      <div className="summary">
        <div className="inner">
          <header>
            <h1>{summary.name}</h1>
            <span>任务汇总</span>
          </header>
          {
            summary.id ?
              <ChartDepartmentSummary
                source={summary}
                ref={r => { this.summaryChart = r }}
              /> :
              <div style={{ height: '250px' }} />
          }
        </div>
      </div>
    )
  }

  render(props, state) {
    return (
      <div className="view-department-chart">

        {this.renderSummary()}

        <div className="body clearfix">

          {this.renderEachUser()}

        </div>
      </div>
    )
  }
}
