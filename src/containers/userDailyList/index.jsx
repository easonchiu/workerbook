import './style'
import React, {Component} from 'react'
import cn from 'classnames'
import {Link} from 'react-router-dom'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import UserHeader from 'src/components/userHeader'
import Spin from 'src/components/spin'


@injectStore
@reactStateData
class UserDailyList extends Component {
	constructor(props) {
		super(props)
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		this.$daily.fetchList()
	}

	changeDate(val) {
		const {gid = 'all', date = 0} = this.props.match.params

		if (date != val) {
			if (val) {
				this.props.history.push(`/daily/${gid}/${val}`)
			} else {
				this.props.history.push(`/daily/${gid}`)
			}
			this.$daily.updateList()
		}

	}

	render() {

		const css = cn('user-daily-list', this.props.className)

		const list = this.$daily.list

		const {date = 0} = this.props.match.params

		const dateStr = ['今天', '昨天', '前天']

		return (
			<Spin loading={this.$daily.listFetching}>
				<div className={css}>
					<Border className="date-bar">
						{
							[0,1,2].map(res => {
								if (res == date) {
									return <p key={res}>{dateStr[res]}</p>
								}
								return (
									<a key={res}
										href="javascript:;"
										onClick={this.changeDate.bind(this, res)}>
										{dateStr[res]}
									</a>
								)
							})
						}
					</Border>
					{
						list.map((res,i) => (
							<div className="daily-item" key={res.uid}>
								<UserHeader name={res.username} className="header" uid={res.uid} link />
								<Border className="daily-bd">
									<h1>
										<time>{res.updateTime}</time>
										<Link to="/daily/user/1">{res.username}</Link>
									</h1>

									<Dailys resource={res.daily} />

								</Border>
							</div>
						))
					}
				</div>
			</Spin>
		)
	}
}

export default UserDailyList