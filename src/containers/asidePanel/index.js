import './style'
import React from 'react'
import cn from 'classnames'

const AsidePanel = props => {
  const { title, addonRight } = props
  return (
    <div className={cn('aside-panel', props.className)}>
      <div className="aside-panel__header">
        <h2>{title}</h2>
        {addonRight}
      </div>
      {props.children}
    </div>
  )
}
export default AsidePanel