import 'src/assets/css/reset'
import 'src/assets/css/base'

import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom'

// view
import ViewLogin from 'src/views/login'
import ViewIndex from 'src/views/index'

// routes
const Routes = e => (
	<Router>
		<Switch>
			<Route exact path="/login" component={ ViewLogin } />
			<Route component={ ViewIndex } />
		</Switch>
	</Router>
)

// render to #root
render(
	<Routes />,
	document.getElementById('root')
)