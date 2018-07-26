import './style'
import React from 'react'
import DailyItem from 'src/components/dailyItem'
import UserHeader from 'src/components/userHeader'

const MainDailyList = props => {
  // const { list = [] } = props
  return (
    <article className="wb-main-daily-list">
      <div className="row clearfix">
        <UserHeader name="赵志达" id={2} gray to="/" />
        <DailyItem data={{}} />
      </div>
      <div className="row clearfix">
        <UserHeader name="赵志达" id={2} gray to="/" />
        <DailyItem data={{}} />
      </div>
      <div className="row clearfix">
        <UserHeader name="赵志达" id={2} gray to="/" />
        <DailyItem data={{}} />
      </div>
      <div className="row clearfix">
        <UserHeader name="赵志达" id={2} gray to="/" />
        <DailyItem data={{}} />
      </div>
    </article>
  )
}
export default MainDailyList