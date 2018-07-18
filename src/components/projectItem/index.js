import './style'
import React from 'react'

const ProjectItem = props => {
  const source = props.source || {}
  const Item = data => {
    return (
      <div className="item" key={data.id}>
        <h6>{data.name}</h6>
        <div className="progress">
          <span style={{ width: data.progress + '%' }} />
        </div>
        {
          data.description && <p>{data.description}</p>
        }
        <span className="info">
          <time>截至时间 {(new Date(data.deadline)).format('yyyy年MM月dd日')}</time>
          <a
            href="javascript:;"
            onClick={() => {
              props.onAssignClick &&
              props.onAssignClick(data.id)
            }}
          >
            5人参与
          </a>
        </span>
      </div>
    )
  }
  return (
    <div className="wb-project-item">
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
      <div className="progress">
        <span style={{ width: source.progress + '%' }} />
      </div>
      <div className="departments">
        {
          source.departments ?
            source.departments.map(item => (
              <em key={item.id}>{item.name}</em>
            )) :
            null
        }
      </div>
      <div className="missions">
        <header className="header">
          <h5>任务列表</h5>
          <a
            href="javascript:;"
            onClick={() => {
              props.onAssignClick &&
              props.onAssignClick()
            }}
          >
            分配任务
          </a>
        </header>
        {
          source.missions && source.missions.length ?
            <div className="list">
              {
                source.missions.map(item => <Item key={item.id} {...item} />)
              }
              <p>共{source.missions.length + '个'}任务</p>
            </div> :
            <p className="empty">暂无任务</p>
        }
      </div>
      <footer className="footer">
        <span>时间周期</span>
        {new Date(source.createTime).format('yyyy年MM月dd日')}
        {' ~ '}
        {new Date(source.deadline).format('yyyy年MM月dd日')}
      </footer>
    </div>
  )
}
export default ProjectItem