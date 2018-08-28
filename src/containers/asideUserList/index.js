import './style'
import React from 'react'

import AsidePanel from '../asidePanel'
import UserHeader from 'src/components/userHeader'

const AsideUserList = props => {
  const { list, isAll } = props
  return (
    <AsidePanel title={isAll ? '全部成员' : '部门成员'} className="wb-aside-user-list">
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