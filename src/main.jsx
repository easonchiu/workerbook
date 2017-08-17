import 'src/assets/css/reset'
import 'src/assets/css/base'

import 'src/assets/libs/dateformat'

import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from "mobx-react"
import { render } from 'react-dom'

// view
import ViewLogin from 'src/views/login'
import ViewIndex from 'src/views/index'

// need login
import NeedLogin from 'src/assets/libs/needLogin'


// routes
const Routes = e => (
	<Router>
		<Switch>
			<Route exact path="/login" component={ NeedLogin(ViewLogin)(false) } />
			
			<Route strict path="/(daily|user)" component={ NeedLogin(ViewIndex)(true) } />

			<Redirect exact from="/" to="/daily" />
			
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