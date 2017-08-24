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

		this.size = 12
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

	pageClick(i) {
		this.$group.setUserListActive(i)
	}

	render() {

		if (!this.$user.info) {
			return null
		}

		let users = this.$user.all || []

		const {gid = 'all'} = this.props.match.params

		if (gid !== 'all') {
			users = users.filter(res => {
				return res.gid == gid
			})
		}

		const pageCount = Math.ceil(users.length / this.size)

		return (
			<Border className="user-list clearfix">
				{
					gid == 'all' ?
					<h1>全部成员</h1> :
					<h1>组内成员</h1>
				}
				{
					pageCount > 1 ?
					<ul className="page">
						{
							Array.from({length:pageCount}).map((res, i) =>
								<li key={i}
									onClick={e => this.pageClick(i)}
									className={this.$group.userListActive == i ? 'active': ''}>
									<a href="javascript:;"><sub /></a>
								</li>
							)
						}
					</ul> :
					null
				}
				{
					users.length > 0 ?
					users.map((res, i) => {
						if (i < this.$group.userListActive * this.size) {
							return null
						}
						if (i >= (this.$group.userListActive + 1) * this.size) {
							return null
						}
						return <UserHeader className="header" name={res.nickname} key={res._id} uid={res._id} link={'/user/' + res._id} />
					}) :
					<p className="empty">暂无成员</p>
				}
			</Border>
		)
	}
}

export default UserList