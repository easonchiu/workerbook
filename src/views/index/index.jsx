import './style'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Header from 'src/containers/header'
import Footer from 'src/containers/footer'
import GroupList from 'src/containers/groupList'
import ProjectList from 'src/containers/projectList'
import UserDailyList from 'src/containers/userDailyList'
import UserList from 'src/containers/userList'
import WriterBox from 'src/containers/writerBox'
import MyDailyList from 'src/containers/myDailyList'
import MyDailyHeader from 'src/containers/myDailyHeader'
import Toast from 'src/components/toast'


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

		this.listen = this.props.history.listen(this.hashChange)
	}

	componentWillUnmount() {
		this.listen()
	}

	hashChange() {
		setTimeout(e => {
			document.body.scrollTop = 0
		})
	}

	async init() {
		try {
			await this.$user.fetchInfo()
		} catch(e) {
			Toast.show(e.msg)
		}
	}

	render() {

		return (
			<div className="view">

				<Route component={Header} />

				<div className="app-main">
					
					<div className="app-body">
						<Route exact path="/user" component={MyDailyHeader} />
						
						<Route exact path="/user" component={MyDailyList} />

						<Route exact path="/index" component={WriterBox} />
						
						<Route exact path="/index" component={UserDailyList} />
					</div>
					
					<div className="app-aside">
						<Route strict path="/:page(index|user)" component={GroupList} />

						<Route exact path="/index" component={UserList} />
					
						<Route exact path="/index" component={ProjectList} />
					</div>

				</div>

				<Footer />

			</div>
		)
	}
}


export default ViewIndex