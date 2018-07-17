import './style'
import React from 'react'
import classNames from 'classnames'

const Pager = props => {
  const d = 'M126.040 295.7c18.8-18.8 49.1-18.801 67.901 0l318 318 318-318c18.8-18.8 49.2-18.8 67.901 0 18.8 18.8 18.801 49.1 0 67.901l-352 352c-18.8 18.8-49.2 18.8-67.901 0l-352-352c-9.4-9.4-14-21.7-14-34 0.1-12.2 4.7-24.501 14.1-33.9z'

  const omit = 'M224 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S276.928 608 224 608zM512 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S564.928 608 512 608zM800 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S852.928 608 800 608z'

  const omitL = (
    <a href="javascript:;" className="wb-pager__omit" key={'omit-l'}>
      <svg width="128" height="128" viewBox="0 0 1024 1024">
        <path d={omit} />
      </svg>
    </a>
  )

  const omitR = (
    <a href="javascript:;" className="wb-pager__omit" key={'omit-r'}>
      <svg width="128" height="128" viewBox="0 0 1024 1024">
        <path d={omit} />
      </svg>
    </a>
  )

  if (!props.max ||
    !props.current ||
    props.max <= 0 ||
    props.current <= 0 ||
    props.max < props.current ||
    props.max === 1) {
    return null
  }

  let allList = []
  let list = []
  for (let i = 1; i <= props.max; i++) {
    allList.push(
      <a
        href="javascript:;"
        key={i}
        className={classNames({
          active: props.current === i
        })}
        onClick={() => {
          props.onClick && props.onClick(i)
        }}
      >
        {i}
      </a>
    )
  }

  if (props.max > 7) {
    let l = Math.max(props.current - 3, 1)
    let r = Math.min(props.current + 2, props.max - 1)
    if (l === 1) {
      r += 4 - props.current
    }
    if (r === props.max - 1) {
      l -= 3 - props.max + props.current
    }
    const nearCurrent = allList.slice(l, r)
    list = [allList[0], ...nearCurrent, allList[allList.length - 1]]
    if (props.current > 4) {
      if (nearCurrent[0].key !== '3') {
        list.splice(1, 0, omitL)
      }
      else {
        list.splice(1, 0, allList[1])
      }
    }
    else if (l === 3) {
      list.splice(1, 0, allList[1])
    }
    if (props.current < props.max - 3) {
      if (nearCurrent[nearCurrent.length - 1].key !== (props.max - 2).toString(10)) {
        list.splice(list.length - 1, 0, omitR)
      }
      else {
        list.splice(list.length - 1, 0, allList[allList.length - 2])
      }
    }
  }
  else {
    list = allList
  }

  return (
    <div className="wb-pager">
      <a
        href="javascript:;"
        className={classNames('wb-pager__prev', {
          'wb-pager--disabled': props.current === 1
        })}
        onClick={() => {
          props.onClick && props.onClick(Math.max(props.current - 1, 1))
        }}
      >
        <svg width="128" height="128" viewBox="0 0 1024 1024">
          <path d={d} />
        </svg>
      </a>
      {list}
      <a
        href="javascript:;"
        className={classNames('wb-pager__next', {
          'wb-pager--disabled': props.current === props.max
        })}
        onClick={() => {
          props.onClick && props.onClick(Math.min(props.current + 1, props.max))
        }}
      >
        <svg width="128" height="128" viewBox="0 0 1024 1024">
          <path d={d} />
        </svg>
      </a>
    </div>
  )
}

export default Pager