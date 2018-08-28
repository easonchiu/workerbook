import './style'
import React from 'react'

const Tips = props => {
  return (
    <div className="wb-tips">
      <div className="wb-tips__hover">
        <sup className="wb-tips__arrow" />
        <p className="wb-tips__content">{props.tips}</p>
      </div>
      {props.children}
    </div>
  )
}

export default Tips