import './style'
import React from 'react'


class MissionItem extends React.PureComponent {
  render() {
    const source = this.props.source || {}
    const project = source.project || {}
    return (
      <div className="wb-mission-item">
        <h2>
          {
            project.weight === 2 ?
              <span className="weight-2">重要</span> :
              project.weight === 3 ?
                <span className="weight-3">紧急</span> :
                null
          }
          {source.name}
        </h2>
        <div className="progress">
          <span style={{ width: source.progress + '%' }} />
        </div>
        <h3>归属项目 {project.name}</h3>
        <p className="description">
          {project.description}
        </p>
        <footer className="footer">
          <p><span>截至时间</span>{new Date(source.deadline).format('yyyy-MM-dd')}</p>
        </footer>
      </div>
    )
  }
}
export default MissionItem