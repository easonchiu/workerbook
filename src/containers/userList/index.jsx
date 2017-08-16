import './style'
import React, {Component} from 'react'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import UserHeader from 'src/components/userHeader'

@injectStore
@reactStateData
class UserList extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.fetch()
	}

	async fetch() {
		try {
			await this.$user.fetchAll()
		} catch(e) {
			console.log(e)
		}
	}

	render() {

		if (this.$daily.listFetching) {
			return null
		}
		
		let users = this.$user.all || []

		const {gid = 'all'} = this.props.match.params

		if (gid !== 'all') {
			users = users.filter(res => {
				return res.gid == gid
			})
		}

		return (
			<Border className="user-list clearfix">
				{
					gid == 'all' ?
					<h1>全部成员</h1> :
					<h1>组内成员</h1>
				}
				{
					users.length > 0 ?
					users.map(res => {
						return <UserHeader className="header" name={res.nickname} key={res._id} uid={res._id} link={'/user/' + res._id} />
					}) :
					<p className="empty">暂无成员</p>
				}
			</Border>
		)
	}
}

export default UserList