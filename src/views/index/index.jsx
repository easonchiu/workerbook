import './style'
import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Header from 'src/containers/header'
import Footer from 'src/containers/footer'
import GroupList from 'src/containers/groupList'
import UserDailyList from 'src/containers/userDailyList'
import UserList from 'src/containers/userList'
import WriterBox from 'src/containers/writerBox'
import MyDailyList from 'src/containers/myDailyList'
import MyDailyHeader from 'src/containers/myDailyHeader'


@injectStore
@reactStateData
class ViewIndex extends Component {
	constructor(props) {
		super(props)
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		this.init()
	}

	async init() {

		try {
			await this.$user.fetchInfo()
		} catch(e) {
			console.error(e)
		}

	}

	render() {

		const group = this.$group.list

		return (
			<div className="view">

				<Route component={Header} />

				<div className="app-main">
					
					<div className="app-body">

						<Route exact path="/home" component={MyDailyHeader} />
						<Route exact path="/home" component={MyDailyList} />

						<Route strict path="/daily/:gid?/:date?" component={WriterBox} />
						
						<Route strict path="/daily/:gid?/:date?" component={UserDailyList} />

						<Route strict path="/daily/:gid?/:date?" component={UserList} />

					</div>
					
					<div className="app-aside">
						<Route strict path="/daily/:gid?/:date?" component={GroupList} />
					</div>

				</div>

				<Footer />

			</div>
		)
	}
}


export default ViewIndex