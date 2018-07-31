import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Button from 'src/components/button'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  componentDidMount() {
    this.evt.fetchData()
  }

  render() {
    const departments = this.props.chart$.departmentsSummary || { list: [] }
    return (
      <div className="view-chart">

        <header className="chart-title">
          <h1>进行中的项目</h1>
        </header>

        <div className="projects-chart clearfix">
          <div className="panel">
            <h2>第一个项目</h2>
            <p>进度：80%</p>
            <p>截止时间：2018-3-22</p>
            <p>已用时：78天 剩余：14天</p>
            <p>任务数：7</p>
            <p>延期任务数：0</p>
          </div>
        </div>

        <header className="chart-title">
          <h1>部门</h1>
        </header>

        <div className="departments-chart clearfix">
          {
            departments.list.map(item => {
              // 异步渲染数据，同步顺序会出错
              setTimeout(() => {
                this.evt.renderDepartmentChart('chart' + item.id, item.missions || [])
              })
              return (
                <div key={item.id} className="panel">
                  <header className="header clearfix">
                    <h2>{item.name}</h2>
                    <span>人数：{item.userCount}</span>
                  </header>
                  <div className="chart" id={'chart' + item.id}>
                    暂无任务数据
                  </div>
                  <Button
                    light
                    className="detail"
                    onClick={() => {
                      this.props.history.push('/chart/department/' + item.id)
                    }}
                  >
                    详情
                  </Button>
                </div>
              )
            })
          }
        </div>

      </div>
    )
  }
}
