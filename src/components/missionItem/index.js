import './style'
import React from 'react'


class HomeMissionItem extends React.PureComponent {
  render() {
    return (
      <div className="wb-mission-item">
        <h2>
          <span className="weight-2">重要</span>
          前端页面开发
        </h2>
        <div className="progress">
          <span style={{ width: 40 + '%' }} />
        </div>
        <footer>
          <p><span>截至时间</span>2018年 3月3日</p>
          <p><span>归属项目</span>app5.3.1开发</p>
        </footer>
      </div>
    )
  }
}
export default HomeMissionItem