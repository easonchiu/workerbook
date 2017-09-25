import './style'
import React, {Component} from 'react'
import qs from 'qs'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import UserHeader from 'src/components/userHeader'

@injectStore
@reactStateData
class UserList extends Component {
	constructor(props) {
		super(props)

		this.size = 1

		this.state = {
			active: 0
		}
	}

	componentDidMount() {
		this.gid = this.getSearch().gid
		this.fetch()
	
		this.listen = this.props.history.listen(this.hashChange)
	}

	hashChange = e => {
		setTimeout(e => {
			const {gid = ''} = this.getSearch()
			if (this.gid != gid) {
				this.gid = gid
				this.setState({
					active: 0
				})
			}
		})
	}

	componentWillUnmount() {
		this.listen()
	}

	getSearch() {
		let search = this.props.location.search
		if (search) {
			search = search.replace(/\?/, '')
			return qs.parse(search)
		}
		return {}
	}

	async fetch() {
		try {
			await this.$user.fetchAll()
		} catch(e) {
			console.log(e)
		}
	}

	pageClick(i) {
		if (this.state.active != i) {
			this.setState({
				active: i
			})
		}
	}

	render() {

		if (!this.$user.info) {
			return null
		}

		let users = this.$user.all || []

		const {gid = ''} = this.getSearch()

		if (gid !== '') {
			users = users.filter(res => {
				return res.gid == gid
			})
		}

		const pageCount = Math.ceil(users.length / this.size)

		return (
			<Border className="user-list clearfix">
				{
					gid == '' ?
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
									className={this.state.active == i ? 'active': ''}>
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
						if (i < this.state.active * this.size) {
							return null
						}
						if (i >= (this.state.active + 1) * this.size) {
							return null
						}
						return (
							<UserHeader
								className="header"
								name={res.nickname}
								key={res._id}
								uid={res._id}
								link={`/user?uid=${res._id}`} />
						)
					}) :
					<p className="empty">暂无成员</p>
				}
			</Border>
		)
	}
}

export default UserList