import './style'
import React from 'react'
import classNames from 'classnames'

import ReactDayPicker from 'react-day-picker'
import 'react-day-picker/lib/style'

class DayPicker extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.id = `wb-day-picker-${new Date() - 0}${Math.round(Math.random() * 9999)}`
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
    if (!this.parentHasId(e.target, this.id)) {
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
    const current = props.value ? props.value.format('yyyy年MM月dd日') : ''

    const downIcon = <svg className="wb-day-picker__down" width="128" height="128" viewBox="0 0 1024 1024"><path d={'M126.040 295.7c18.8-18.8 49.1-18.801 67.901 0l318 318 318-318c18.8-18.8 49.2-18.8 67.901 0 18.8 18.8 18.801 49.1 0 67.901l-352 352c-18.8 18.8-49.2 18.8-67.901 0l-352-352c-9.4-9.4-14-21.7-14-34 0.1-12.2 4.7-24.501 14.1-33.9z'} /></svg>

    const mm = '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_')
    const wk = '日一二三四五六'.split('')

    return (
      <div
        className={classNames('wb-day-picker', {
          'wb-day-picker--opened': this.state.visible,
        })}
        id={this.id}
      >
        <a
          href="javascript:;"
          className="wb-day-picker__value"
          onClick={this.transVisible}
        >
          {current || <sup>请选择</sup>}
          {downIcon}
        </a>
        {
          this.state.visible ?
            <div className="wb-day-picker__days">
              <ReactDayPicker
                months={mm}
                month={props.value}
                fromMonth={new Date()}
                weekdaysShort={wk}
                selectedDays={[props.value]}
                onDayClick={e => {
                  if (props.onChange) {
                    props.onChange(e)
                    this.transVisible()
                  }
                }}
                disabledDays={[{
                  before: new Date()
                }]}
              />
            </div> :
            null
        }
      </div>
    )
  }
}

export default DayPicker