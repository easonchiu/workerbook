import './style'
import React from 'react'

import Progress from 'src/components/progress'

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
        <Progress width={60} value={source.progress} isTimeout={source.isTimeout} />
        <footer>
          <p><span>截止时间</span>{new Date(source.deadline).format('yyyy年 MM月dd日')}</p>
          <p><span>归属项目</span>{project.name}</p>
        </footer>
      </div>
    )
  }
}
export default MissionItem