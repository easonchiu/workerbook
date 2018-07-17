import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Wrapper from 'src/containers/wrapper'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  componentDidMount() {
    this.evt.fetchData()
  }

  renderEachMission() {
    return (
      <div className="mission-chart">
        <header>
          <h2>套餐下单h5修改</h2>
          <div className="progress">
            <p>任务进度：76%</p>
            <em><span /></em>
          </div>
        </header>

        <div className="users">
          <div className="user">
            <sub style={{ background: '#63a5e2' }} />
            <p>张三</p>
            <span>预估完成：5天</span>
            <strong>已使用：3天</strong>
          </div>
          <div className="user">
            <sub style={{ background: '#86da73' }} />
            <p>李四</p>
            <span>预估完成：5天</span>
            <strong>已使用：3天</strong>
          </div>
        </div>

        <div className="chart">
          chart
        </div>
      </div>
    )
  }

  render(props, state) {
    const profile = this.props.user$.profile

    return (
      <div className="view-project-chart">
        <Wrapper.Header nav="chart" profile={profile} />

        <Wrapper.Full className="project-chart">
          <header>
            <h1>5.3.1开发 进度总览</h1>
          </header>
          <div className="chart">
            chart
          </div>
        </Wrapper.Full>

        <Wrapper.Body>

          {this.renderEachMission()}
          {this.renderEachMission()}
          {this.renderEachMission()}

        </Wrapper.Body>

        <Wrapper.Footer />
      </div>
    )
  }
}
