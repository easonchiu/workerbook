import './style'
import React from 'react'
import classNames from 'classnames'

const Button = props => {
  const css = classNames('wb-button', {
    mini: props.mini,
    light: props.light && !props.danger,
    danger: props.danger,
  }, props.className)

  return (
    <button className={css} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button