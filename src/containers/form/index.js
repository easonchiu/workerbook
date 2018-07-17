import './style'
import React from 'react'
import classNames from 'classnames'

const Form = props => {
  const css = classNames('wb-form', props.className)
  return (
    <div className={css}>
      {props.children}
    </div>
  )
}

const Row = props => {
  const css = classNames('wb-form__row', props.className)
  return (
    <div className={css}>
      <label className="wb-form__label">{props.label}</label>
      <div className="wb-form__content">
        {props.children}
      </div>
    </div>
  )
}

Form.Row = Row
export default Form