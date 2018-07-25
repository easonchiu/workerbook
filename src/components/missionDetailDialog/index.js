import './style'
import React from 'react'
import AsideDialog from 'src/containers/asideDialog'
import IconClose from 'src/components/svg/close'
import IconRewrite from 'src/components/svg/rewrite'
import UserHeader from 'src/components/userHeader'

const MissionDetailDialog = props => {
  let { source } = props
  source = source || {}
  const project = source.project || {}
  const user = source.user || {}
  const stText = !user.exist ?
    <em className="del">[已删除]</em> :
    user.status === 2 ? <em className="stop">[停用]</em> : ''

  const renderMission = () => (
    <div className="mission-info">
      <h3>{source.name}</h3>
      <div className="progress">
        <span style={{ width: (source.progress || 0) + '%' }} />
      </div>
      <time>
        <span>截至时间</span> {new Date(source.deadline).format('yyyy年 MM月dd日')}
      </time>
      <div className="user">
        <UserHeader
          to="/"
          mini
          colorful
          name={user.nickname || ''}
          id={user.id}
          status={!user.exist ? 99 : user.status}
        />
        <div className="info">
          <p>{user.nickname}{stText}</p>
          <span>{user.title}</span>
        </div>
      </div>
      <IconRewrite.A
        className="edit"
        onClick={() => {
          props.onEditClick &&
          props.onEditClick(source)
        }}
      />
    </div>
  )

  return (
    <AsideDialog
      className="wb-dialog-mission-detail"
      visible={props.visible}
      onBgClick={props.onCloseClick}
    >
      <div className="inner">
        <header className="header">
          <h2>
            {
              project.weight === 2 ?
                <span className="weight-2">重要</span> :
                project.weight === 3 ?
                  <span className="weight-3">紧急</span> :
                  null
            }
            {project.name}
          </h2>
          <IconClose.A onClick={props.onCloseClick} />
        </header>
        {renderMission()}
        <div className="dailies">
          <h3>相关日报</h3>
          <p className="empty">暂无日报</p>
        </div>
      </div>
    </AsideDialog>
  )
}

export default MissionDetailDialog