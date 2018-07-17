import './style'
import React from 'react'
import classNames from 'classnames'

import UserHeader from 'src/components/userHeader'
import Button from 'src/components/button'
import MainDialog from 'src/containers/mainDialog'

/**
 * maxAge: 剩余时间（小时）
 */

class MissionItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      projectRulePopupVisible: false,
      missionRulePopupVisible: false,
    }
  }

  // 显示项目弹层
  showProjectRule = () => {
    this.setState({
      projectRulePopupVisible: true
    })
  }

  // 隐藏项目弹层
  hideProjectRule = () => {
    this.setState({
      projectRulePopupVisible: false
    })
  }

  // 显示任务弹层
  showMissionRule = () => {
    this.setState({
      missionRulePopupVisible: true
    })
  }

  // 隐藏任务弹层
  hideMissionRule = () => {
    this.setState({
      missionRulePopupVisible: false
    })
  }

  // 项目说明的弹层
  renderProjectRule() {
    return (
      <MainDialog
        className="dialog-project-rule"
        visible={this.state.projectRulePopupVisible}
        title="世界杯活动页面开发"
        onClose={this.hideProjectRule}
      >
        <div className="info">
          <time>截至时间：2018年5月5日</time>
          <p>参与部门：A部门、B部门、C部门</p>
        </div>
        <div className="rule">
          <h3>项目说明</h3>
          <p>
            扒拉扒拉
          </p>
        </div>
      </MainDialog>
    )
  }

  // 任务说明的弹层
  renderMissionRule() {
    return (
      <MainDialog
        className="dialog-mission-rule"
        visible={this.state.missionRulePopupVisible}
        title="前端页面开发"
        onClose={this.hideMissionRule}
      >
        <div className="info">
          <time>任务截至时间：2018年3月5日</time>
          <p>所属项目：世界杯活动页面开发</p>
          <time>项目截至时间：2018年5月5日</time>
        </div>
        <div className="rule">
          <h3>任务说明</h3>
          <p>
            1. 手机端页面开发<br />
            2. 管理后台开发<br />
            3. 接口调试<br />
            4. 设计稿地址：svn://www.teambition.com/project/5817253812b5bf873ff638b5/tasks/scrum/581725384303de6837796e0d
          </p>
        </div>
        <div className="all-users">
          <h3>参与人员</h3>
          <div className="list">
            <UserHeader mini name="张三" to="/" />
            <UserHeader mini name="李四" to="/" />
            <UserHeader mini name="龙五" to="/" />
          </div>
        </div>
      </MainDialog>
    )
  }

  render() {
    const css = classNames('mission-item', {
      'show-joined': this.props.showJoined
    })
    return (
      <div className={css}>
        <h2>前端页面开发</h2>
        <p className="project">所属项目：世界杯活动页面开发</p>
        {
          !this.props.showJoined ?
            <time>执行周期：3天<strong>剩余1天</strong></time> :
            null
        }
        <time>截至时间：2018年 3月3日</time>
        <div className="tools">
          <Button mini light onClick={this.showProjectRule}>项目说明</Button>
          <Button mini light onClick={this.showMissionRule}>任务说明</Button>
        </div>
        <div className="progress"><span>45</span></div>
        {
          this.props.showJoined ?
            <div className="joined-list">
              <UserHeader name="Eason.Chiu" mini to={1} />
              <UserHeader name="牛哥牛哥" mini to={1} />
              <UserHeader name="张小三" mini to={1} />
              <UserHeader name="李四" mini to={1} />
              <UserHeader name="龙五" mini to={1} />
              <p className="more">等32人</p>
              {
                !this.props.joined ?
                  <Button mini className="join">分配</Button> :
                  null
              }
            </div> :
            null
        }
        {this.renderProjectRule()}
        {this.renderMissionRule()}
      </div>
    )
  }
}
export default MissionItem