import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'

import fetcher from 'src/utils/fetcher'
import PieChartDepartment from 'src/components/pieChartDepartment'
import Pager from 'src/components/pager'

@VIEW
class ChartDepartmentList extends PureComponent {
  componentDidMount() {
    const p = this.search.page || 1
    this.fetchData(p)
  }

  // 获取部门数据
  fetchData = async (page = 1) => {
    await fetcher.one(this.props.$analytics.fetchDepartmentsList, {
      skip: page * 9 - 9,
      limit: 9,
    })
    this.chartList && this.chartList.forEach(i => { i.$fill() })
  }

  // 部门翻页
  onPageClick = p => {
    this.fetchData(p)
    this.props.history.push('?page=' + p)
  }

  // 部门图表列表
  renderChartList() {
    const departments = this.props.analytics$.departmentsList || { list: [] }
    this.chartList = []
    return (
      <div className="list clearfix">
        {
          departments.list.map(item => {
            return (
              <PieChartDepartment
                key={item.id}
                source={item}
                ref={r => {
                  r && this.chartList.push(r)
                }}
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

  render() {
    const departments = this.props.analytics$.departmentsList || { list: [] }
    return (
      <div className="chart-department-list">
        <header className="header">
          <h1>全部部门</h1>
        </header>
        {this.renderChartList()}
        <Pager
          current={departments.skip / departments.limit + 1}
          max={Math.ceil(departments.count / departments.limit)}
          onClick={this.onPageClick}
        />
      </div>
    )
  }
}

export default ChartDepartmentList