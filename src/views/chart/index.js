import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import PieChartProject from 'src/components/pieChartProject'
import PieChartDepartment from 'src/components/pieChartDepartment'
import Pager from 'src/components/pager'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabsIndex: 0
    }
  }

  componentDidMount() {
    if (this.state.tabsIndex === 0) {
      this.evt.fetchProjectData()
    }
    else {
      this.evt.fetchDepartmentData()
    }
  }

  // 项目图表列表
  renderProjectsChart() {
    const projects = this.props.analytics$.projectsList || { list: [] }
    return (
      <div className="projects-chart clearfix">
        {
          projects.list.map(item => {
            return (
              <PieChartProject
                key={item.id}
                source={item}
                onClick={id => {
                  this.props.history.push('/chart/project/' + id)
                }}
              />
            )
          })
        }
      </div>
    )
  }

  // 部门图表列表
  renderDepartmentsChart() {
    const departments = this.props.analytics$.departmentsList || { list: [] }
    return (
      <div className="departments-chart clearfix">
        {
          departments.list.map(item => {
            return (
              <PieChartDepartment
                key={item.id}
                source={item}
                onClick={id => {
                  this.props.history.push('/chart/department/' + id)
                }}
              />
            )
          })
        }
      </div>
    )
  }

  // 渲染项目页面
  renderProjectPage() {
    const projects = this.props.analytics$.projectsList || {}
    return (
      <div>
        <header className="chart-title">
          <h1>进行中的项目</h1>
        </header>
        {this.renderProjectsChart()}
        <Pager
          current={projects.skip / projects.limit + 1}
          max={Math.ceil(projects.count / projects.limit)}
          onClick={this.evt.onProjectPageClick}
        />
      </div>
    )
  }

  // 渲染部门页面
  renderDepartmentPage() {
    const departments = this.props.analytics$.departmentsList || {}
    return (
      <div>
        <header className="chart-title">
          <h1>全部部门</h1>
        </header>
        {this.renderDepartmentsChart()}
        <Pager
          current={departments.skip / departments.limit + 1}
          max={Math.ceil(departments.count / departments.limit)}
          onClick={this.evt.onDepartmentPageClick}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="view-chart">

        <header className="chart-tabs">
          <a
            href="javascript:;"
            className={this.state.tabsIndex === 0 ? 'active' : ''}
            onClick={this.evt.onTabsClick.bind(this, 0)}
          >
            项目
          </a>
          <a
            href="javascript:;"
            className={this.state.tabsIndex === 1 ? 'active' : ''}
            onClick={this.evt.onTabsClick.bind(this, 1)}
          >
            部门
          </a>
        </header>

        {
          this.state.tabsIndex === 0 ?
            this.renderProjectPage() :
            this.renderDepartmentPage()
        }

      </div>
    )
  }
}
