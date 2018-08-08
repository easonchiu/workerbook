import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'

import fetcher from 'src/utils/fetcher'
import PieChartProject from 'src/components/pieChartProject'
import Pager from 'src/components/pager'

@VIEW
class ChartProjectList extends PureComponent {
  componentDidMount() {
    const p = this.search.page || 1
    this.fetchData(p)
  }

  // 获取项目的数据
  fetchData = async (page = 1) => {
    await fetcher.one(this.props.$analytics.fetchProjectsList, {
      skip: page * 3 - 3,
      limit: 3,
    })
    this.chartList && this.chartList.forEach(i => { i.$fill() })
  }

  // 项目翻页
  onPageClick = p => {
    this.fetchData(p)
    this.props.history.push('?page=' + p)
  }

  // 项目图表列表
  renderChartList() {
    this.chartList = []
    const projects = this.props.analytics$.projectsList || { list: [] }
    return (
      <div className="list clearfix">
        {
          projects.list.map(item => {
            return (
              <PieChartProject
                key={item.id}
                source={item}
                ref={r => {
                  r && this.chartList.push(r)
                }}
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

  render() {
    const projects = this.props.analytics$.projectsList || {}
    return (
      <div className="chart-project-list">
        <header className="header">
          <h1>进行中的项目</h1>
        </header>
        {this.renderChartList()}
        <Pager
          current={projects.skip / projects.limit + 1}
          max={Math.ceil(projects.count / projects.limit)}
          onClick={this.onPageClick}
        />
      </div>
    )
  }
}

export default ChartProjectList