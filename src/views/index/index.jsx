import styles from './style'
import React, { Component } from 'react'
import connect from 'src/mobx'
import reactStateData from 'react-state-data'
import {observer} from 'mobx-react'

import Header from 'src/containers/header'
import Footer from 'src/containers/footer'
import GroupList from 'src/containers/groupList'
import Border from 'src/containers/border'
import Input from 'src/components/input'
import Button from 'src/components/button'
import DailyList from 'src/containers/dailyList'
import Dailys from 'src/components/dailys'
import UserHeader from 'src/components/userHeader'
import RecordInput from 'src/components/recordInput'
import Spin from 'src/containers/spin'


@connect
@reactStateData
@observer
class ViewIndex extends Component {
	constructor(props) {
		super(props)

		this.setData({
			loading: true
		})

		setTimeout(e => {
			this.data.loading = false
		}, 1000)
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	renderWriter() {
		return (
			<div className="writer">
				<i className="icon" />
				<Border className="con">
					<Dailys className="my-daily" rewriteabled />
					<RecordInput className="newrecord" loading={this.data.loading} />
				</Border>
			</div>
		)
	}

	renderUserList() {
		return (
			<Border className="users clearfix">
				<h1>All users in <span>FE Department</span></h1>
				{
					[1,2,3,4,5,6,7,8,9,10,11,12,13].map(res => {
						return <UserHeader className="header" name="Eason" key={res} uid={res} link />
					})
				}
			</Border>
		)
	}

	render() {
		return (
			<div className="view-index">
				
				<Header {...this.props} />

				<div className="app-main">
					
					<div className="app-body">
						
						{this.renderWriter()}
						
						<Spin height={200} loading={this.data.loading}>
							<DailyList className="list" />

							{this.renderUserList()}
						</Spin>
					</div>
					
					<Spin className="aside-loading" height={200} loading={this.data.loading}>
						<GroupList />
					</Spin>

				</div>

				<Footer />

			</div>
		)
	}
}

export default ViewIndex