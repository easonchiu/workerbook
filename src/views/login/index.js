import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Input from 'src/components/input'
import Button from 'src/components/button'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loading: false,
    }
  }

  render() {
    return (
      <main className="view-login">
        <form>
          <h1 className="logo" />

          <div className="row">
            <label>用户名</label>
            <Input
              placeholder="用户名"
              className="username"
              value={this.state.username}
              onChange={this.evt.usernameChange}
            />
          </div>

          <div className="row">
            <label>用户名</label>
            <Input
              type="password"
              placeholder="密码"
              className="password"
              value={this.state.password}
              onChange={this.evt.passwordChange}
            />
          </div>

          <div className="row">
            <label />
            <Button onClick={this.evt.onSubmit}>
              登录
            </Button>
          </div>

        </form>
      </main>
    )
  }
}
