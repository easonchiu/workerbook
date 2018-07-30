import './style'
import React from 'react'
import Tips from 'src/components/tips'

const Icon = () => (
  <svg className="wb-svg" width="128" height="128" viewBox="0 0 1024 1024">
    <path d="M505.173333 416.426666 122.88 27.306666c-27.306667-27.306667-68.266667-27.306667-102.4 0l0 0c-27.306667 27.306667-27.306667 68.266667 0 102.4L409.6 512l-389.12 389.12c-27.306667 27.306667-27.306667 68.266667 0 102.4l0 0c27.306667 27.306667 68.266667 27.306667 102.4 0l389.12-389.12 389.12 389.12c27.306667 27.306667 68.266667 27.306667 102.4 0l0 0c27.306667-27.306667 27.306667-68.266667 0-102.4L607.573333 512l389.12-389.12c27.306667-27.306667 27.306667-68.266667 0-102.4l0 0c-27.306667-27.306667-68.266667-27.306667-102.4 0L505.173333 416.426666 505.173333 416.426666z" />
  </svg>
)

const A = props => {
  return (
    <a
      href="javascript:;"
      className={`wb-icon ${props.className || ''}`}
      onClick={props.onClick}
    >
      {
        props.tips ?
          <Tips tips={props.tips}>
            <Icon />
          </Tips> :
          <Icon />
      }
    </a>
  )
}

Icon.A = A

export default Icon