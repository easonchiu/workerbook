import APP_CONFIG from '../../appConfig'
import React from 'react'
import AsyncComponent from 'src/hoc/asyncComponent'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { getToken } from 'src/utils/token'

const Login = AsyncComponent(() => import('src/views/login'))
const Wrapper = AsyncComponent(() => import('src/views/wrapper'))

const NeedLogin = View => {
  class HOCView extends React.Component {
    render() {
      const token = getToken()
      if (token) {
        return <View {...this.props} />
      }
      return <Redirect to="/login" />
    }
  }
  return HOCView
}

// 配置路由
const Routes = () => {
  return (
    <BrowserRouter basename={APP_CONFIG.basename}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route component={NeedLogin(Wrapper)} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
