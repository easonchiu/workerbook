import './style'
import React from 'react'
import className from 'classnames'

import IconCheck from 'src/components/svg/check'

const Progress = props => {
  const style = {}
  if (props.width) {
    style.width = props.width + 'px'
  }
  return (
    <div
      className={className('wb-progress', {
        [`wb-progress--${props.color}`]: props.color,
        'wb-progress--100': props.value >= 100,
        'wb-progress--timeout': props.isTimeout && props.value < 100,
      })}
      style={style}
    >
      {
        props.value < 100 ?
          <p>{props.value + '%'}</p> :
          null
      }
      <div className="line">
        <span style={{ width: props.value + '%' }} />
        {
          props.value >= 100 ?
            <em><IconCheck /></em> :
            null
        }
      </div>
    </div>
  )
}

export default Progress