import './style'
import React from 'react'
import className from 'classnames'

const Progress = props => {
  const style = {}
  if (props.width) {
    style.width = props.width + 'px'
  }
  return (
    <div
      className={className('wb-progress', {
        [`wb-progress--${props.color}`]: props.color,
        'wb-progress--timeout': props.isTimeout && props.value < 100,
      })}
      style={style}
    >
      <p>{props.value}%</p>
      <div className="line">
        <span style={{ width: props.value + '%' }} />
      </div>
    </div>
  )
}

export default Progress