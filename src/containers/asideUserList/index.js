import './style'
import React from 'react'

import AsidePanel from '../asidePanel'
import UserHeader from 'src/components/userHeader'

const AsideUserList = props => {
  const { list, isAll } = props
  return (
    <AsidePanel title={isAll ? '全部成员' : '部门成员'} className="aside-user-list">
      <div className="user-list clearfix">
        {
          list && list.length ?
            list.map(item => {
              return (
                <UserHeader
                  name={item.nickname}
                  key={item.id}
                  userId={item.id}
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