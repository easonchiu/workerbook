import './style'
import React, { cloneElement } from 'react'
import classNames from 'classnames'

class Select extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.id = `wb-select-${new Date() - 0}${Math.round(Math.random() * 9999)}`
  }

  parentHasId = (el1, id) => {
    let el = el1
    while (el.nodeName) {
      if (el && el.id === id) {
        return true
      }
      if (el.parentElement) {
        el = el.parentElement
      }
      else {
        return false
      }
    }
  }

  listener = e => {
    if (!this.props.multi || (this.props.multi && !this.parentHasId(e.target, this.id))) {
      document.removeEventListener('click', this.listener)
      this.setState({
        visible: false
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listener)
  }

  transVisible = e => {
    const nextVisible = !this.state.visible
    this.setState({
      visible: nextVisible
    })
    if (nextVisible) {
      document.addEventListener('click', this.listener)
    }
    else {
      document.removeEventListener('click', this.listener)
    }
  }

  render() {
    const { props } = this
    const current = {}

    const closeIcon = <svg width="128" height="128" viewBox="0 0 1024 1024"><path d={'M597.795527 511.488347 813.564755 295.718095c23.833825-23.833825 23.833825-62.47489 0.001023-86.307691-23.832801-23.832801-62.47489-23.833825-86.307691 0L511.487835 425.180656 295.717583 209.410404c-23.833825-23.833825-62.475913-23.833825-86.307691 0-23.832801 23.832801-23.833825 62.47489 0 86.308715l215.769228 215.769228L209.410915 727.258599c-23.833825 23.833825-23.833825 62.47489 0 86.307691 23.832801 23.833825 62.473867 23.833825 86.307691 0l215.768205-215.768205 215.769228 215.769228c23.834848 23.833825 62.475913 23.832801 86.308715 0 23.833825-23.833825 23.833825-62.47489 0-86.307691L597.795527 511.488347z'} /></svg>

    const downIcon = <svg className="wb-select__down" width="128" height="128" viewBox="0 0 1024 1024"><path d={'M126.040 295.7c18.8-18.8 49.1-18.801 67.901 0l318 318 318-318c18.8-18.8 49.2-18.8 67.901 0 18.8 18.8 18.801 49.1 0 67.901l-352 352c-18.8 18.8-49.2 18.8-67.901 0l-352-352c-9.4-9.4-14-21.7-14-34 0.1-12.2 4.7-24.501 14.1-33.9z'} /></svg>
    let children = this.props.children

    if (props.children && !Array.isArray(props.children)) {
      children = [props.children]
    }

    const currentValues = []

    children = children ?
      children.map((item, index) => {
        if (!Array.isArray(props.value)) {
          if (props.value === item.props.value) {
            current.value = item.props.value
            current.text = item.props.children
          }
        }
        else {
          if (props.value.indexOf(item.props.value) !== -1) {
            currentValues.push({
              value: item.props.value,
              text: item.props.children,
            })
          }
        }
        return cloneElement(item, {
          value: item.props.value || '',
          key: index,
          onClick: props.onClick,
          current: props.value,
        })
      }) :
      <Option
        className="wb-select__list-none"
        value=""
        onClick={props.onClick}
      >
        请选择
      </Option>

    const multiValues = props.multi && (
      <p className="wb-select__values">
        {
          currentValues.length ?
            currentValues.map((item, i) => {
              return (
                <span key={i}>
                  {item.text}
                  <a
                    href="javascript:;"
                    onClick={() => {
                      props.onClick && props.onClick(item.value)
                    }}
                  >
                    {closeIcon}
                  </a>
                </span>
              )
            }) :
            <sup>请选择</sup>
        }
        {downIcon}
        <a className="bg" href="javascript:;" onClick={this.transVisible} />
      </p>
    )

    return (
      <div
        className={classNames('wb-select', {
          'wb-select--multi': props.multi,
          'wb-select--opened': this.state.visible,
        })}
        id={this.id}
      >
        {
          props.multi ?
            multiValues :
            <a
              href="javascript:;"
              className="wb-select__value"
              onClick={this.transVisible}
            >
              {current.text || <sup>请选择</sup>}
              {downIcon}
            </a>
        }
        {
          this.state.visible ?
            <ul className="wb-select__list">
              {children}
            </ul> :
            null
        }
      </div>
    )
  }
}

const Option = props => {
  const isActive = (value, current) => {
    if (Array.isArray(current)) {
      return props.current.indexOf(value) !== -1
    }
    else {
      return value === current
    }
  }
  const active = isActive(props.value, props.current)
  const checkIcon = <svg width="128" height="128" viewBox="0 0 1024 1024"><path d={'M913.017 237.02c-25.311-25.312-66.349-25.312-91.66 0l-412.475 412.474-206.237-206.237c-25.312-25.312-66.35-25.312-91.661 0s-25.312 66.35 0 91.66l252.067 252.067c0.729 0.73 1.439 1.402 2.134 2.029 25.434 23.257 64.913 22.585 89.527-2.029l458.303-458.303c25.313-25.312 25.313-66.35 0.001-91.661z'} /></svg>

  return (
    <li>
      <a
        href="javascript:;"
        name={props.value}
        onClick={() => {
          props.onClick && props.onClick(props.value)
        }}
        className={classNames({
          'wb-select__list-active': active
        }, props.className)}
      >
        {props.children}
        {active ? checkIcon : null}
      </a>
    </li>
  )
}

Select.Option = Option

export default Select