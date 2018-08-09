import './style'
import React from 'react'

import AsidePanel from '../asidePanel'
import UserHeader from 'src/components/userHeader'
import MiniPager from 'src/components/miniPager'

const AsideUserList = props => {
  const data = props.data || {}
  const { list = [], skip = 0, limit = 0, count = 0 } = data
  return (
    <AsidePanel
      title={props.isAll ? '全部成员' : '部门成员'}
      className="wb-aside-user-list"
      addonRight={
        <MiniPager
          current={skip / limit + 1}
          max={Math.ceil(count / limit)}
          onChange={props.onPageChange}
        />
      }
    >
      <div className="list clearfix">
        {
          list && list.length ?
            list.map(item => {
              return (
                <UserHeader
                  gray
                  name={item.nickname}
                  key={item.id}
                  id={item.id}
                  to={`/index?uid=${item.id}`}
                />
              )
            }) :
            <p className="empty">暂无成员</p>
        }
      </div>
    </AsidePanel>
  )
}
export default AsideUserList