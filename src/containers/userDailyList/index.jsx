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
class UserDailyList extends Component {
	constructor(props) {
		super(props)

		Object.assign(this, {...this.props.store})
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		// this.props.$daily.fetchList()
	}

	changeDate(val) {
		const {gid, date} = this.props.match.params
		
		if (date != val) {
			this.props.history.push(`/daily/${gid}/${val}`)
		}
	}

	render() {

		const css = cn('user-daily-list', this.props.className)

		const list = [] // this.props.$daily.list

		return null

		return (
			<Spin loading={this.props.$daily.listFetching}>
				<div className={css}>
					<Border className="date-bar">
						<a href="javascript:;" className="active" onClick={this.changeDate.bind(this, '')}>Today</a>
						<a href="javascript:;" onClick={this.changeDate.bind(this, -1)}>Aug 8, 2017</a>
						<a href="javascript:;" onClick={this.changeDate.bind(this, -2)}>Aug 7, 2017</a>
					</Border>
					{
						list.map((res,i) => (
							<div className="daily-item" key={res.uid}>
								<UserHeader name={res.username} className="header" uid={res.uid} link />
								<Border className="daily-bd">
									<h1>
										<time>{res.updateTime}</time>
										<Link to="/home/1">{res.username}</Link>
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