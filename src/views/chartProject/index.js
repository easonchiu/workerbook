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
  componentDidMount() {
    this.evt.fetchData()
  }

  renderEachMission(id) {
    return (
      <div className="mission-chart">
        <header className="header">
          <h2>套餐下单h5修改</h2>
          <div className="user">
            <p>执行人：张三</p>
            <span>截至时间：2018-05-02</span>
          </div>
        </header>
        <ChartMission id={id} />
      </div>
    )
  }

  renderSummary() {
    return (
      <div className="summary">
        <div className="inner">
          <header className="header">
            <h1>app 5.3.1开发</h1>
            <span>项目进度</span>
          </header>
          <ChartProjectSummary source={{}} />
        </div>
      </div>
    )
  }

  render(props, state) {
    return (
      <div className="view-project-chart">

        {this.renderSummary()}

        <div className="body clearfix">

          {this.renderEachMission(1)}
          {this.renderEachMission(2)}
          {this.renderEachMission(3)}
          {this.renderEachMission(4)}

        </div>

      </div>
    )
  }
}
