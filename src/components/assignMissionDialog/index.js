import './style'
import React from 'react'
import AsideDialog from 'src/containers/asideDialog'
import IconClose from 'src/components/svg/close'
import IconAdd from 'src/components/svg/add'
import UserHeader from 'src/components/userHeader'
import UserSelect from 'src/components/userSelect'

const Mission = props => {
  return (
    <div className="mission-info">
      <h2>前端页面开发</h2>
      <div className="progress">
        <span style={{ width: 40 + '%' }} />
      </div>
      <p className="description">
        世界杯活动页面开发世界杯活动页面开发世界杯活动页面开发世界杯活动页面开发世界杯活动页面开发
      </p>
      <div className="joined-list clearfix">
        <UserHeader name="Eason.Chiu" mini to="/" />
        <UserHeader name="牛哥牛哥" mini to="/" />
        <UserHeader name="张小三" mini to="/" />
        <UserHeader name="李四" mini to="/" />
        <UserHeader name="龙五" mini to="/" />
        <UserHeader name="Eason.Chiu" mini to="/" />
        <UserHeader name="牛哥牛哥" mini to="/" />
        <UserHeader name="张小三" mini to="/" />
        <UserHeader name="张小三" mini to="/" />
        <UserHeader name="李四" mini to="/" />
        <UserHeader name="龙五" mini to="/" />
        <IconAdd.A className="assign" />
      </div>
      <footer className="footer">
        <p><span>参与人数</span>3人</p>
        <p><span>截至时间</span>2018年 3月3日</p>
      </footer>
    </div>
  )
}

const AssignMissionDialog = props => {
  return (
    <AsideDialog
      className="wb-dialog-assign-mission"
      visible={props.visible}
      onBgClick={props.onCloseClick}
    >
      <div className="inner">
        <header className="header">
          <h2><span className="weight-2">重要</span>世界杯活动页面开发</h2>
          <IconClose.A onClick={props.onCloseClick} />
        </header>
        <Mission />
        {/* <UserSelect /> */}
      </div>
    </AsideDialog>
  )
}

export default AssignMissionDialog