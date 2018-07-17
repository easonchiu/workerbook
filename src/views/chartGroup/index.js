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
            <p>套餐下单h5修改<span>所属项目：5.3.1开发</span></p>
          </div>
          <div className="mission">
            <sub style={{ background: '#86da73' }} />
            <p>套餐下单h5修改<span>所属项目：5.3.1开发</span></p>
          </div>
          <div className="mission">
            <sub style={{ background: '#c7b3ff' }} />
            <p>套餐下单h5修改<span>所属项目：5.3.1开发</span></p>
          </div>
        </div>

        <div className="chart">
          <div className="row">
            <span style={{ background: '#63a5e2', width: '150px' }} />
            <span style={{ background: '#63a5e2', width: '250px', marginLeft: '400px' }}>
              <sup style={{ width: '150px' }} />
              <sub style={{ width: '30px' }} />
            </span>
          </div>
          <div className="row">
            <span style={{ background: '#86da73', width: '400px', marginLeft: '140px' }}>
              <sup style={{ width: '150px' }} />
            </span>
          </div>
          <div className="row">
            <span style={{ background: '#c7b3ff', width: '150px', marginLeft: '70px' }} />
            <span style={{ background: '#c7b3ff', width: '200px', marginLeft: '600px' }} />
          </div>
        </div>
        <div className="date">
          <span>06/01</span>
          <span>06/02</span>
          <span>06/03</span>
          <span>06/04</span>
          <span>06/05</span>
          <span>06/06</span>
          <span>06/07</span>
          <span>06/08</span>
          <span>06/09</span>
          <span>06/10</span>
          <span>06/11</span>
          <span>06/12</span>
        </div>
      </div>
    )
  }

  render(props, state) {
    const profile = this.props.user$.profile

    return (
      <div className="view-group-chart">
        <Wrapper.Header nav="chart" profile={profile} />

        <Wrapper.Full className="group-chart">
          <header>
            <h1>前端开发部门</h1>
          </header>
          <div className="chart">
            <ul>
              <li>8</li>
              <li>6</li>
              <li>4</li>
              <li>2</li>
              <li>0</li>
            </ul>
            <div className="chart-pic">
              <ul>
                <li />
                <li />
                <li />
                <li />
                <li />
              </ul>
              <div>
                <sup />
                <sub />
                <span />
              </div>
              <div>
                <sup />
                <span style={{ height: '70px' }} />
              </div>
              <div>
                <sup />
                <sub />
                <span style={{ height: '70px' }} />
              </div>
              <div>
                <sup />
                <sub />
                <span />
              </div>
              <div>
                <sup />
                <span style={{ height: '70px' }} />
              </div>
              <div>
                <sup />
                <sub />
                <span style={{ height: '70px' }} />
              </div>
              <div>
                <sub style={{ height: '110px' }} />
                <span />
              </div>
            </div>
          </div>
          <div className="user">
            <span>张三</span>
            <span>张三</span>
            <span>张三</span>
            <span>张三</span>
            <span>张三</span>
            <span>张三</span>
            <span>张三</span>
          </div>
        </Wrapper.Full>

        <Wrapper.Body>

          {this.renderEachUser()}
          {this.renderEachUser()}
          {this.renderEachUser()}

        </Wrapper.Body>

        <Wrapper.Footer />
      </div>
    )
  }
}
