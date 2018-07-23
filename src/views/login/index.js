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
      username: 'eason3',
      password: '123456'
    }
  }

  render() {
    return (
      <main className="view-login">
        <form>

          <Input
            placeholder="用户名"
            className="username"
            value={this.state.username}
            onChange={this.evt.usernameChange}
          />

          <Input
            type="password"
            placeholder="密码"
            className="password"
            value={this.state.password}
            onChange={this.evt.passwordChange}
          />

          <Button onClick={this.evt.onSubmit}>
            登录
          </Button>

        </form>
      </main>
    )
  }
}
