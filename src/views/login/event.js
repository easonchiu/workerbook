import { setToken } from 'src/utils/token'

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
    try {
      const token = await this.props.$user.login({
        username: this.state.username,
        password: this.state.password,
      })
      setToken(token)
      this.props.history.push('/')
    }
    catch (err) {
      alert(err.message)
    }
  }

}
