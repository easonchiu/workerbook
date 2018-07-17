import './style'
import React from 'react'
import classNames from 'classnames'

const MiniPager = props => {
  const d = 'M126.040 295.7c18.8-18.8 49.1-18.801 67.901 0l318 318 318-318c18.8-18.8 49.2-18.8 67.901 0 18.8 18.8 18.801 49.1 0 67.901l-352 352c-18.8 18.8-49.2 18.8-67.901 0l-352-352c-9.4-9.4-14-21.7-14-34 0.1-12.2 4.7-24.501 14.1-33.9z'

  if (!props.max ||
    !props.current ||
    props.max <= 0 ||
    props.current <= 0 ||
    props.max < props.current) {
    return null
  }

  const lcss = classNames('mini-pager__l', {
    disabled: props.current === 1
  })

  const rcss = classNames('mini-pager__r', {
    disabled: props.current >= props.max
  })

  return (
    <div className="mini-pager">
      <a
        href="javascript:;"
        className={lcss}
        onClick={props.onChange && props.onChange.bind(null, props.current - 1)}
      >
        <svg width="128" height="128" viewBox="0 0 1024 1024">
          <path d={d} />
        </svg>
      </a>
      <a
        href="javascript:;"
        className={rcss}
        onClick={props.onChange && props.onChange.bind(null, props.current + 1)}
      >
        <svg width="128" height="128" viewBox="0 0 1024 1024">
          <path d={d} />
        </svg>
      </a>
    </div>
  )
}
export default MiniPager