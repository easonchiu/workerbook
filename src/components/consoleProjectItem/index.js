import './style'
import React from 'react'
import ignore from 'src/utils/ignore'

import IconSetting from 'src/components/svg/setting'
import IconAdd from 'src/components/svg/add'
import IconDelete from 'src/components/svg/delete'

const ProjectItem = props => {
  const source = props.source || {}

  const renderProjectTools = () => (
    <div className="tools">
      <IconDelete.A
        className="del"
        onClick={() => {
          props.onDelProjectClick && props.onDelProjectClick(props.source)
        }}
      />
      <IconSetting.A
        onClick={() => {
          props.onEditProjectClick && props.onEditProjectClick(props.source)
        }}
      />
    </div>
  )

  const renderMisstionTools = data => (
    <div className="tools">
      <IconDelete.A
        className="del"
        onClick={() => {
          props.onDelMissionClick &&
          props.onDelMissionClick(data, ignore(source, 'missions'))
        }}
      />
      <IconSetting.A
        onClick={() => {
          props.onEditMissionClick &&
          props.onEditMissionClick(data, ignore(source, 'missions'))
        }}
      />
    </div>
  )

  const renderMissions = () => {
    const Item = data => {
      return (
        <div className="item" key={data.id}>
          <h6>{data.name}</h6>
          {
            data.description && <p>{data.description}</p>
          }
          <span className="info">
            <time>截至时间 {(new Date(data.deadline)).format('yyyy年 MM月dd日')}</time>
            {renderMisstionTools(data)}
          </span>
        </div>
      )
    }
    return (
      <div className="missions">
        <header className="header">
          <h5>任务列表</h5>
          <IconAdd.A
            className="append"
            onClick={() => {
              props.onAddMissionClick && props.onAddMissionClick(props.source)
            }}
          />
        </header>
        {
          source.missions && source.missions.length ?
            <div className="list scroller">
              {
                source.missions.map(item => <Item key={item.id} {...item} />)
              }
              <p>共{source.missions.length + '个'}任务</p>
            </div> :
            <p className="empty">暂无任务</p>
        }
      </div>
    )
  }

  const renderFooter = () => (
    <footer>
      <span>时间周期</span>
      {new Date(source.createTime).format('yyyy年MM月dd日')}
      {' ~ '}
      {new Date(source.deadline).format('yyyy年MM月dd日')}
    </footer>
  )

  return (
    <div className="wbc-project-item">
      <h2>
        {
          source.weight === 2 ?
            <span className="weight-2">重要</span> :
            source.weight === 3 ?
              <span className="weight-3">紧急</span> :
              null
        }
        {source.name}
      </h2>
      <div className="departments">
        {
          source.departments ?
            source.departments.map(item => (
              <em key={item.id}>{item.name}</em>
            )) :
            null
        }
      </div>
      {renderMissions()}
      {renderProjectTools()}
      {renderFooter()}
    </div>
  )
}
export default ProjectItem