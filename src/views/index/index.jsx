import './style'
import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import connect from 'src/mobx'
import reactStateData from 'react-state-data'
import {observer} from 'mobx-react'

import Header from 'src/containers/header'
import Footer from 'src/containers/footer'
import GroupList from 'src/containers/groupList'
import UserDailyList from 'src/containers/userDailyList'
import UserList from 'src/containers/userList'
import WriterBox from 'src/containers/writerBox'
import MyDailyList from 'src/containers/myDailyList'
import MyDailyHeader from 'src/containers/myDailyHeader'


@connect
@reactStateData
@observer
class ViewIndex extends Component {
	constructor(props) {
		super(props)

		this.setData({
			loading: false
		})
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		this.init()
	}

	async init() {
		this.data.loading = true

		try {
			await this.props.$user.fetchInfo()
		} catch(e) {
			console.error(e)
		}

		this.data.loading = false
	}

	render() {
		
		const group = this.props.$group.list

		return (
			<Router>
				<div className="view">
					
					<Route component={Header} />

					<div className="app-main">
						
						<div className="app-body">

							<Route exact path="/home/:id" component={MyDailyHeader} />
							<Route exact path="/home/:id" component={MyDailyList} />

							<Route exact path="/" component={WriterBox} />
							<Route exact path="/:gid" component={WriterBox} />

							<Route exact path="/" component={UserDailyList} />
							<Route exact path="/:gid" component={UserDailyList} />

							<Route exact path="/" component={UserList} />
							<Route exact path="/:gid" component={UserList} />

						</div>
						
						<div className="app-aside">
							<Route component={GroupList} />
						</div>

					</div>

					<Footer />

				</div>
			</Router>
		)
	}
}

export default ViewIndex