import React from 'react'

const Icon = () => (
  <svg width="128" height="128" viewBox="0 0 1024 1024">
    <path d="M913.017 237.02c-25.311-25.312-66.349-25.312-91.66 0l-412.475 412.474-206.237-206.237c-25.312-25.312-66.35-25.312-91.661 0s-25.312 66.35 0 91.66l252.067 252.067c0.729 0.73 1.439 1.402 2.134 2.029 25.434 23.257 64.913 22.585 89.527-2.029l458.303-458.303c25.313-25.312 25.313-66.35 0.001-91.661z" />
  </svg>
)

const A = props => {
  return (
    <a
      href="javascript:;"
      className={props.className}
      onClick={props.onClick}
    >
      <Icon />
    </a>
  )
}

Icon.A = A

export default Icon