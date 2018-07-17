import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <main className="view-login">
        <form>

          <input
            type="text"
            placeholder="用户名"
            className="username"
            value={this.state.username}
            onChange={this.evt.usernameChange}
          />

          <input
            type="text"
            placeholder="密码"
            className="password"
            value={this.state.password}
            onChange={this.evt.passwordChange}
          />

          <button onClick={this.evt.onSubmit}>
            登录
          </button>

        </form>
      </main>
    )
  }
}
