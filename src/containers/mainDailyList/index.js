import './style'
import React from 'react'

import DailyItem from 'src/components/dailyItem'
import UserHeader from 'src/components/userHeader'

const MainDailyList = props => {
  // const { list = [] } = props
  return (
    <article className="wb-main-daily-list">
      <div className="daily-item clearfix">
        <UserHeader name="easonZhao" id={1} to="/" />
        <DailyItem />
      </div>

      <div className="daily-item clearfix">
        <UserHeader name="easonZhao" id={2} to="/" />
        <DailyItem />
      </div>

      <div className="daily-item clearfix">
        <UserHeader name="easonZhao" id={3} to="/" />
        <DailyItem />
      </div>

      <div className="daily-item clearfix">
        <UserHeader name="easonZhao" id={4} to="/" />
        <DailyItem />
      </div>
    </article>
  )
}
export default MainDailyList