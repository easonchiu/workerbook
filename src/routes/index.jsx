import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import ViewIndex from 'src/views/index'
import ViewHome from 'src/views/home'
import ViewLogin from 'src/views/login'


const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/login" component={ ViewLogin } />
				
				<Route path="/" component={ ViewIndex } />
				
				<Redirect from="*" to="/" />
			</Switch>
		</Router>
	)
}

export default Routes