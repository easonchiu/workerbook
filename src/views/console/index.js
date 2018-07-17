import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'
import { Link, Route, Switch } from 'react-router-dom'

import Wrapper from 'src/containers/wrapper'
import ConsoleUser from 'src/views/consoleUser'
import ConsoleDepartment from 'src/views/consoleDepartment'
import ConsoleProject from 'src/views/consoleProject'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showMission: false
    }
  }

  componentDidMount() {
    this.evt.fetchData()
  }

  renderAside() {
    const page  = this.props.location.pathname
    const menus = [{
      title: '人员管理',
      to: '/console/user'
    }, {
      title: '部门管理',
      to: '/console/department'
    }, {
      title: '项目管理',
      to: '/console/project'
    }, {
      title: '日程管理',
      to: '/console/events'
    }]
    return (
      <div className="console-aside">
        <ul>
          {
            menus.map(res => {
              return (
                <li
                  key={res.to}
                  className={page === res.to ? 'active' : ''}
                >
                  <Link to={res.to}>
                    <i /><span>{res.title}</span>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  render(props, state) {
    const profile = this.props.user$.profile

    return (
      <div className="view-console">
        <Wrapper.Header nav="console" profile={profile} />

        <div className="console-main">
          {this.renderAside()}
          <div className="console-body">
            <Switch>
              <Route exact path="/console/user" component={ConsoleUser} />
              <Route exact path="/console/department" component={ConsoleDepartment} />
              <Route exact path="/console/project" component={ConsoleProject} />
            </Switch>
          </div>
        </div>

        <Wrapper.Footer />
      </div>
    )
  }
}
