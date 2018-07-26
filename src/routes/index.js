import APP_CONFIG from '../../appConfig'
import React from 'react'
import AsyncComponent from 'src/hoc/asyncComponent'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Login = AsyncComponent(() => import('src/views/login'))
const Wrapper = AsyncComponent(() => import('src/views/wrapper'))

// 配置路由
const Routes = () => {
  return (
    <BrowserRouter basename={APP_CONFIG.basename}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route component={Wrapper} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
