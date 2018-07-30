import './style'
import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import Tips from 'src/components/tips'

const UserHeader = props => {
  // status: 1 正常 2 停用 99 已被删除
  let { name = '', status = 1, self } = props
  let isBig = false
  let maxLen = props.mini ? 2 : 6

  if ((/(^[a-z]+$)/gi).test(name) && name.length > maxLen) {
    // 全部为英文的名字，如果超过6个字母，只保留首字母，使用大号字体
    name = name.substr(0, 1).toUpperCase()
    isBig = true
  }
  else if ((/\./i).test(name)) {
    // 如果有点，取点前半段，同样如果超过6个字母，保留首字母，使用大号字体
    name = name.split('.')[0]
    if (name.length > maxLen) {
      name = name.substr(0, 1).toUpperCase()
      isBig = true
    }
  }
  else if (!(/([a-z]+)/gi).test(name)) {
    // 如果非英文名，则认为包含中文等其他，超过3个字，取名，否则取姓
    if (name.length >= 3) {
      name = name.substr(-2)
    }
    else if (name.length === 1) {
      isBig = true
    }
  }

  let color = props.id ? props.id.toString().replace(/\D/g, '') : 0
  color = color ? (color - 0) % 6 : 0

  const css = classNames('wb-user-header', [`color-${color}`], props.className, {
    'mini': props.mini,
    'big-font': isBig,
    'gray': props.gray,
  })

  let st = null

  if (!self) {
    st = status === 99 ?
      <span className="del" /> :
      status === 2 ?
        <span className="stop" /> :
        null
  }
  else {
    st = <span className="self" />
  }

  const stText = status === 99 ?
    ' [已删除]' : status === 2 ? ' [停用]' : ''

  if (props.to) {
    return (
      <Link className={css} to={props.to}>
        <Tips tips={props.name + stText}>
          {name}
          {st}
        </Tips>
      </Link>
    )
  }

  return (
    <div className={css}>
      {name}
      {st}
    </div>
  )
}
export default UserHeader