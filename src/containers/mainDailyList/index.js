import './style'
import React from 'react'
import DailyItem from 'src/components/dailyItem'

const MainDailyList = props => {
  const { list } = props
  return (
    <article className="main-daily-list">
      {
        list.map(item => <DailyItem key={item.id} data={item} />)
      }
    </article>
  )
}
export default MainDailyList