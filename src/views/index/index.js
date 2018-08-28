import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import AsideDepartmentList from 'src/containers/asideDepartmentList'
import AsideUserList from 'src/containers/asideUserList'

import MissionItem from 'src/components/missionItem'
import MyDailyWriter from 'src/components/myDailyWriter'
import MainDailyList from 'src/containers/mainDailyList'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showAllOwnsMission: false
    }
  }

  componentDidMount() {
    this.evt.fetchData()
  }

  // 任务栏
  renderOwnsMissionList() {
    let list = this.props.mission$.owns_missions || []
    return (
      <div className="owns-mission-list">
        <div className="inner">
          <header className="header clearfix">
            <h1>参与的任务</h1>
            <span>
              共{list.length}个任务
              <a href="javascript:;">显示全部</a>
            </span>
          </header>
          <div className="list clearfix">
            {
              list.map((item, i) => {
                if (!this.state.showAllOwnsMission && i >= 3) {
                  return null
                }
                return <MissionItem key={item.id} source={item} />
              })
            }
          </div>
        </div>
      </div>
    )
  }

  // 日报编写区
  renderMyDailyWriter() {
    const missions = this.props.mission$.owns_missions || []
    const select = missions.map(item => ({
      id: item.id,
      text: item.name,
    }))
    const dailies = this.props.daily$.today
    return (
      <MyDailyWriter
        ref={r => { this.myDailyWriter = r }}
        dailies={dailies}
        missionSelect={select}
        onEdit={this.evt.onEditDaily}
        onDelete={this.evt.onDeleteDaily}
        onCreate={this.evt.onCreateDaily}
        onSetProgress={this.evt.onSetMissionProgress}
      />
    )
  }

  // 主体区的日报列表
  renderDailyList() {
    return <MainDailyList source={this.props.daily$.day} />
  }

  // 侧栏的部门模块
  renderDepartmentList() {
    return (
      <AsideDepartmentList
        data={this.props.department$.departments}
        active={this.props.user$.users.departmentId}
        itemClick={this.evt.departmentClick}
        onPageChange={this.evt.departmentPageChange}
      />
    )
  }

  // 侧栏的用户模块
  renderUserList() {
    const users = this.props.user$.users || { list: [] }
    return (
      <AsideUserList
        list={users.list}
        isAll={!users.departmentId}
      />
    )
  }

  render() {
    return (
      <div className="view-index">

        {this.renderOwnsMissionList()}

        <div className="body clearfix">
          <div className="main">
            {this.renderMyDailyWriter()}
            {this.renderDailyList()}
          </div>

          <div className="aside">
            {this.renderDepartmentList()}
            {this.renderUserList()}
          </div>
        </div>
      </div>
    )
  }
}
