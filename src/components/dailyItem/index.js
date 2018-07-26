import './style'
import React from 'react'

const DailyItem = props => {
  // const { data } = props

  // 日报列表
  const renderDailyList = () => {
    return (
      <div className="daily-list">
        <div className="item">
          <div className="mission clearfix">
            <span />
            <strong>社区4.0 前端页面开发</strong>
          </div>
          <p>配合测试, 上传合同接口增加接收字段,车辆修改记录接口增加返回字段</p>
          <p>配合测试, 修改车辆状态增加操作日志记录(补7月24日)</p>
        </div>

        <div className="item">
          <div className="mission clearfix">
            <span />
            <strong>社区4.0 前端页面开发</strong>
          </div>
          <p>配合测试, 上传合同接口增加接收字段,车辆修改记录接口增加返回字段</p>
        </div>

      </div>
    )
  }

  return (
    <section className="wb-daily-item">
      <header className="header">
        <a href="javascript:;">Eason.Chiu</a>
        <span>更新于</span>
        <time>15:30</time>
      </header>
      {renderDailyList()}
    </section>
  )
}
export default DailyItem