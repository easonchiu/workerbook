import './style'
import React from 'react'
import classNames from 'classnames'

import UserHeader from 'src/components/userHeader'
import Button from 'src/components/button'
import IconCheck from 'src/components/svg/check'
import IconClose from 'src/components/svg/close'

class UserSelect extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      active: props.value || []
    }
  }

  onUserClick = item => {
    const index = this.state.active.indexOf(item)
    const list = [...this.state.active]
    if (index === -1) {
      list.push(item)
    }
    else {
      list.splice(index, 1)
    }
    this.setState({
      active: list
    })
  }

  render() {
    const { props } = this
    const list = [1, 2, 3, 4, 5, 6]
    return (
      <div className={classNames('wb-user-select', props.className)}>
        <header className="header">
          <h2>可选成员</h2>
          <IconClose.A />
        </header>
        <ul>
          {
            list.map(item => (
              <li key={item} onClick={this.onUserClick.bind(this, item)}>
                <sup className={this.state.active.indexOf(item) > -1 ? 'checked' : ''}>
                  <IconCheck />
                </sup>
                <UserHeader name="我是谁" mini colorful />
                <p>我是谁<span>已有任务 5个</span></p>
              </li>
            ))
          }
        </ul>
        <footer className="footer">
          {
            (this.state.active && this.state.active.length) ?
              <p>共选中<span>{this.state.active.length}</span>人</p> :
              null
          }
          <Button mini disabled={!this.state.active || !this.state.active.length}>
            确定
          </Button>
        </footer>
      </div>
    )
  }
}

export default UserSelect