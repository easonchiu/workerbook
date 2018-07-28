import './style'
import React from 'react'
import DailyItem from 'src/components/dailyItem'
import UserHeader from 'src/components/userHeader'

const MainDailyList = props => {
  const source = props.source || { list: [] }
  return (
    <article className="wb-main-daily-list">
      {
        source.list.map(item => {
          const user = item.user || {}
          return (
            <div className="row clearfix" key={item.id}>
              <UserHeader name={user.nickname} id={user.id} gray to="/" />
              <DailyItem source={item} />
            </div>
          )
        })
      }
    </article>
  )
}
export default MainDailyList