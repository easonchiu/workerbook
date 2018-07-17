import './style'
import React from 'react'
import classNames from 'classnames'

const Input = props => {
  const css = classNames('wb-input', props.className)
  const domprops = {
    ...props,
    multi: null,
  }
  if (props.multi) {
    return (
      <textarea {...domprops} className={css} />
    )
  }

  return (
    <input {...domprops} className={css} />
  )
}
export default Input