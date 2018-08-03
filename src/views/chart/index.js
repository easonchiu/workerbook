import './style'
import React, { PureComponent } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

import ChartDepartmentList from 'src/views/chartDepartmentList'
import ChartProjectList from 'src/views/chartProjectList'

export default class View extends PureComponent {
  render() {
    const page = this.props.location.pathname
    return (
      <div className="view-chart">

        <header className="chart-tabs">
          <Link
            to="project"
            className={page === '/chart/project' ? 'active' : ''}
          >
            项目
          </Link>
          <Link
            to="department"
            className={page === '/chart/department' ? 'active' : ''}
          >
            部门
          </Link>
        </header>

        <Switch>
          <Route exact path="/chart/project" component={ChartProjectList} />
          <Route exact path="/chart/department" component={ChartDepartmentList} />
          <Redirect to="/chart/project" />
        </Switch>


      </div>
    )
  }
}
