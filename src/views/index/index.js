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

import MainDialog from 'src/containers/mainDialog'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      popupVisible: false
    }
  }

  componentDidMount() {
    this.evt.fetchData()
  }

  // 日报编写区
  renderMyDailyWriter() {
    return (
      <MyDailyWriter
        ref={el => {
          this.$myDailyWriter = el
        }}
        myDailyList={this.props.user$.fetchMyTodayDaily}
        projectList={this.props.project$.list}
        onDeleteItem={this.evt.deleteDailyClick}
        onAppend={this.evt.appendDaily}
      />
    )
  }

  // 主体区的日报列表
  renderDailyList() {
    return <MainDailyList list={this.props.daily$.list} />
  }

  // 侧栏的部门模块
  renderDepartmentList() {
    return (
      <AsideDepartmentList
        data={this.props.department$.departments}
        active={this.props.user$.activeGroup}
        itemClick={this.evt.departmentClick}
        onPageChange={this.evt.departmentPageChange}
      />
    )
  }

  // 侧栏的用户模块
  renderUserList() {
    return (
      <AsideUserList
        list={this.props.user$.list}
        isAll={this.props.user$.activeGroup === ''}
        itemClick={this.evt.groupClick}
      />
    )
  }

  render(props, state) {
    // const profile = this.props.user$.profile

    return (
      <div className="view-index">

        <div className="header-missions">
          <div className="inner">
            <header>
              <h1>参与的任务</h1>
            </header>
            <div className="list clearfix">
              <MissionItem />
              <MissionItem />
              <MissionItem />
            </div>
          </div>
        </div>

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

        <MainDialog visible={this.state.popupVisible}>
          <div
            onClick={() => {
              this.setState({
                popupVisible: false
              })
            }}
          >
            xxxx
          </div>
        </MainDialog>
      </div>
    )
  }
}
