import './style'
import React from 'react'

const DailyItem = props => {
  const source = props.source || { list: [] }
  const user = source.user || {}

  // 日报列表
  const renderDailyList = () => {
    const dailies = source.dailies || []
    const data = {}
    dailies.forEach(item => {
      // 这是任务
      if (item.mission && item.mission.id && item.project && item.project.id) {
        const key = item.mission.id
        if (typeof data[key] === 'undefined') {
          data[key] = { list: [] }
        }
        data[key]['progress'] = item.progress
        data[key]['groupTitle'] = item.project.name + item.mission.name
        data[key]['list'].push({
          content: item.content,
          id: item.id,
        })
      }
    })

    return (
      <div className="daily-list">
        {
          Object.values(data).map((item, i) => {
            return (
              <div key={i} className="item">
                <div className="header clearfix">
                  <span />
                  <strong>{item.groupTitle}</strong>
                </div>
                {
                  item.list.map((k, i) => (
                    <div className="content clearfix" key={k.id}>
                      <sup>{i + 1}.</sup>
                      <p>{k.content}</p>
                    </div>
                  ))
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <section className="wb-daily-item">
      <header className="header">
        <a href="javascript:;">{user.nickname}</a>
        <span>更新于</span>
        <time>{new Date(source.updateTime).format('hh:mm:ss')}</time>
      </header>
      {renderDailyList()}
    </section>
  )
}
export default DailyItem