import './style'
import React from 'react'

import MiniPager from 'src/components/miniPager'
import AsidePanel from '../asidePanel'

const Item = props => {
  if (props.active) {
    return (
      <p>{props.children}</p>
    )
  }
  return (
    <a href="javascript:;" onClick={props.onClick}>
      {props.children}
    </a>
  )
}

const AsideDepartmentList = props => {
  const { data = {}, active, itemClick = () => {} } = props
  const { list, skip, limit, count } = data
  return (
    <AsidePanel
      title="部门"
      className="aside-department-list"
      addonRight={
        <MiniPager
          current={skip / limit + 1}
          max={Math.ceil(count / limit)}
          onChange={props.onPageChange}
        />
      }
    >
      <ul>
        <li>
          <Item active={active === ''} onClick={itemClick.bind(null, '')}>
            <i /><span>全部</span>
          </Item>
        </li>
        {
          list.map(item => {
            return (
              <li key={item.id}>
                <Item active={active === item.id} onClick={itemClick.bind(null, item.id)}>
                  <i />
                  <span>{item.name}</span>
                  <em>{item.userCount}人</em>
                </Item>
              </li>
            )
          })
        }
      </ul>
    </AsidePanel>
  )
}
export default AsideDepartmentList