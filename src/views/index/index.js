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
import DayPicker from 'src/components/dayPicker'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dayPickerValue: null,
      department: null
    }
  }

  componentDidMount() {
    const search = this.search
    if (search.department) {
      this.setState({
        department: search.department
      })
    }
    if (search.day && search.day.length > 3) {
      this.setState({
        dayPickerValue: new Date(search.day)
      })
    }
    this.evt.fetchData()
  }

  // 任务栏
  renderMissionBar() {
    const list = this.props.mission$.owns_missions || []
    if (!list.length) {
      return <div className="empty-header-missions" />
    }
    return (
      <div className="header-missions">
        <div className="inner">
          <header>
            <h1>参与的任务</h1>
          </header>
          <div className="list clearfix">
            {
              list.map(item => (
                <MissionItem key={item.id} source={item} />
              ))
            }
          </div>
        </div>
      </div>
    )
  }

  // 日报编写区
  renderMyDailyWriter() {
    const role = this.props.user$.profile.role
    if (role === '99' || role === 99) {
      return null
    }
    const missions = this.props.mission$.owns_missions || []
    const events = this.props.events$.events || []
    const missionSelect = missions.map(item => ({
      id: item.id,
      text: {
        t: item.name,
        p: item.project.name,
      },
    }))
    const eventsSelect = events.map(item => ({
      id: item.id,
      text: item.name,
    }))
    const dailies = this.props.daily$.today
    return (
      <MyDailyWriter
        ref={r => { this.myDailyWriter = r }}
        dailies={dailies}
        missionSelect={missionSelect}
        eventsSelect={eventsSelect}
        onEdit={this.evt.onEditDaily}
        onDelete={this.evt.onDeleteDaily}
        onCreate={this.evt.onCreateDaily}
        onSetProgress={this.evt.onSetMissionProgress}
      />
    )
  }

  // 主体区的日报列表
  renderDailyList() {
    const data = this.props.daily$.day || { list: [] }
    return <MainDailyList source={data} />
  }

  // 侧栏的部门模块
  renderDepartmentList() {
    return (
      <AsideDepartmentList
        data={this.props.department$.departments}
        active={this.state.department}
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
        data={users}
        isAll={!users.departmentId}
        onPageChange={this.evt.userPageChange}
      />
    )
  }

  // 日期选择
  renderDayPicker() {
    const search = this.search
    const start = new Date()
    start.setMonth(start.getMonth() - 2)
    const now = new Date()
    return (
      <div className="daily-day-picker clearfix">
        {
          search.day === '0' || !search.day ?
            <p>今天</p> :
            <a href="javascript:;" onClick={this.evt.dayClick.bind(this, '0')}>
              今天
            </a>
        }
        {
          search.day === '1' ?
            <p>昨天</p> :
            <a href="javascript:;" onClick={this.evt.dayClick.bind(this, '1')}>
              昨天
            </a>
        }
        {
          search.day === '2' ?
            <p>前天</p> :
            <a href="javascript:;" onClick={this.evt.dayClick.bind(this, '2')}>
              前天
            </a>
        }
        <DayPicker
          start={start}
          placeholder="更多日期"
          end={now}
          value={this.state.dayPickerValue}
          onChange={this.evt.dayPickerChange}
        />
      </div>
    )
  }

  render(props, state) {
    return (
      <div className="view-index">

        {this.renderMissionBar()}

        <div className="body clearfix">
          <div className="main">
            {this.renderMyDailyWriter()}
            {this.renderDayPicker()}
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
