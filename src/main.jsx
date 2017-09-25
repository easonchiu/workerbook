import 'src/assets/css/reset'
import 'src/assets/css/base'

import 'src/assets/libs/dateformat'

import React, { Component } from 'react'
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from "mobx-react"
import { render } from 'react-dom'

const Router = process.env.ENV_NAME === 'develop' ? HashRouter : BrowserRouter
const basename = process.env.ENV_NAME === 'test1' ? '/workerbook' : '/'

// view
import ViewLogin from 'src/views/login'
import ViewIndex from 'src/views/index'

// need login
import NeedLogin from 'src/assets/libs/needLogin'

// routes
const Routes = e => (
	<Router basename={basename}>
		<Switch>
			<Route exact path="/login" component={ NeedLogin(ViewLogin)(false) } />
			
			<Route exact path="/(index|user)" component={ NeedLogin(ViewIndex)(true) } />

			<Redirect exact from="/" to="/index" />
			
			<Redirect to="/404" />
		</Switch>
	</Router>
)

// store
import store from 'src/mobx'

// render to #root
render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root')
)