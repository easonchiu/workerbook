import './style'
import React, { PureComponent } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

import ConsoleUser from 'src/views/consoleUser'
import ConsoleDepartment from 'src/views/consoleDepartment'
import ConsoleProject from 'src/views/consoleProject'

export default class View extends PureComponent {
  renderAside() {
    const page = this.props.location.pathname
    const menus = [{
      title: '人员管理',
      to: 'user'
    }, {
      title: '部门管理',
      to: 'department'
    }, {
      title: '项目管理',
      to: 'project'
    }]
    return (
      <div className="console-aside">
        <ul>
          {
            menus.map(res => (
              <li
                key={res.to}
                className={page === '/console/' + res.to ? 'active' : ''}
              >
                <Link to={res.to}>
                  <i /><span>{res.title}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="view-console clearfix">

        {this.renderAside()}

        <div className="console-body">
          <Switch>
            <Route exact path="/console/user" component={ConsoleUser} />
            <Route exact path="/console/department" component={ConsoleDepartment} />
            <Route exact path="/console/project" component={ConsoleProject} />
            <Redirect to="/console/user" />
          </Switch>
        </div>

      </div>
    )
  }
}
