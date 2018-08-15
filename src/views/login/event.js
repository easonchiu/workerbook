import { setToken } from 'src/utils/token'
import fetcher from 'src/utils/fetcher'
import Err from 'src/utils/errif'

export default class Event {

  // username input change event.
  usernameChange = e => {
    this.setState({
      username: e.target.value
    })
  }

  // password input change event.
  passwordChange = e => {
    this.setState({
      password: e.target.value
    })
  }

  // click handle on submit button.
  onSubmit = async e => {
    e.preventDefault()
    Err.IfEmpty(this.state.username, '用户名不能为空')
    Err.IfEmpty(this.state.password, '密码不能为空')

    if (Err.Handle()) {
      return
    }

    try {
      const token = await fetcher.one(this.props.$user.login, {
        username: this.state.username,
        password: this.state.password,
      })
      setToken(token)
      this.props.history.push('/')
    }
    catch (err) {
      this.setState({
        username: '',
        password: '',
      })
    }

  }

}
