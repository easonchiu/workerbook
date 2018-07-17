import './style'
import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const UserHeader = props => {
  let { name } = props
  let isBig = false
  let maxLen = props.mini ? 2 : 6

  if ((/(^[a-z]+$)/gi).test(name) && name.length > maxLen) {
    // 全部为英文的名字，如果超过6个字母，只保留首字母，使用大号字体
    name = name.substr(0, 1).toUpperCase()
    isBig = true
  } else if ((/\./i).test(name)) {
    // 如果有点，取点前半段，同样如果超过6个字母，保留首字母，使用大号字体
    name = name.split('.')[0]
    if (name.length > maxLen) {
      name = name.substr(0, 1).toUpperCase()
      isBig = true
    }
  } else if (!(/([a-z]+)/gi).test(name)) {
    // 如果非英文名，则认为包含中文等其他，超过3个字，取名，否则取姓
    if (name.length >= 3) {
      name = name.substr(-2)
    } else if (name.length === 1) {
      isBig = true
    }
  }

  let color = props.userId ? props.userId.toString().replace(/\D/g, '') : 0
  color = color ? color % 6 : 0

  const colorful = props.colorful || props.to

  const css = classNames('user-header', props.className, {
    'user-header--mini': props.mini,
    'user-header--big-font': isBig,
    [`user-header--color-${color}`]: colorful
  })

  if (props.to) {
    return (
      <Link className={css} to={props.to}>
        <p><span /><em>{props.name}</em></p>
        {name}
      </Link>
    )
  }

  return (
    <div className={css}>
      {name}
    </div>
  )
}
export default UserHeader