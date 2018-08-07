import './style'
import React from 'react'
import classNames from 'classnames'

const DailyItem = props => {
  const source = props.source || { list: [] }

  // 日报列表
  const renderDailyList = () => {
    const dailies = source.dailyList || []
    const data = {}
    dailies.forEach(item => {
      // 这是任务
      if (item.missionId && item.projectId) {
        const key = item.missionId
        if (typeof data[key] === 'undefined') {
          data[key] = { list: [] }
        }
        data[key]['progress'] = item.progress
        data[key]['type'] = 'mission'
        data[key]['groupTitle'] = item.projectName + ' - ' + item.missionName
        data[key]['list'].push({
          content: item.record,
          id: item.id,
        })
      }
      // 这是日常
      else if (item.eventId) {
        const key = item.eventId
        if (typeof data[key] === 'undefined') {
          data[key] = { list: [] }
        }
        data[key]['type'] = 'events'
        data[key]['groupTitle'] = item.eventName
        data[key]['list'].push({
          content: item.record,
          id: item.id,
        })
      }
    })

    return (
      <div className="daily-list">
        {
          Object.values(data).map((item, i) => {
            const css = classNames('item', `item--${item.type}`)
            return (
              <div key={i} className={css}>
                <div className="header clearfix">
                  {
                    item.type === 'mission' ? <span /> : null
                  }
                  {
                    item.type === 'mission' ?
                      <strong>{item.groupTitle}</strong> :
                      <strong><em>[日常]</em>{item.groupTitle}</strong>
                  }

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
        <a href="javascript:;">{source.nickname}</a>
        <span>更新于</span>
        <time>{new Date(source.updateTime).format('hh:mm:ss')}</time>
      </header>
      {renderDailyList()}
    </section>
  )
}
export default DailyItem