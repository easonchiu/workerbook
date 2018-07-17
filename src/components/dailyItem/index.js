import './style'
import React from 'react'

const Daily = props => {
  const { data } = props
  return (
    <section className="daily-item">
      <h2>
        <a href="javascript:;">{data.nickname}</a>
        更新于
        {
          data.updateTime &&
          <time>{new Date(data.updateTime).format('hh:mm:ss')}</time>
        }
      </h2>
      <ul>
        {
          data.dailyList.map(i => (
            <li key={i.id}>
              <p>
                {
                  i.pname && <strong>{i.pname}</strong>
                }
                {i.record}
              </p>
            </li>
          ))
        }
      </ul>
    </section>
  )
}
export default Daily