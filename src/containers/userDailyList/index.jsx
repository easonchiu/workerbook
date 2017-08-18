import './style'
import React, {Component} from 'react'
import cn from 'classnames'
import {Link} from 'react-router-dom'
import timeago from 'timeago.js'
const timeagoInstance = timeago()

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import UserHeader from 'src/components/userHeader'
import Spin from 'src/components/spin'
import Toast from 'src/components/toast'

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
		const {gid, date = 0} = this.props.match.params
		this.fetch(gid,date)
	}

	async fetch(gid, date) {
		try {
			await this.$daily.fetchDailyListWithGroupAndDate(gid, date)
		} catch(e) {
			Toast.show(e.msg)
		}
	}

	changeDate(val) {
		const {gid = 'all', date} = this.props.match.params

		if (date != val) {
			if (val) {
				this.props.history.push(`/daily/${gid}/${val}`)
			} else {
				this.props.history.push(`/daily/${gid}`)
			}
			this.fetch(gid, val)
		}

	}

	render() {

		const css = cn('user-daily-list', this.props.className)

		const list = this.$daily.list || []

		const {date = 0} = this.props.match.params

		return (
			<Spin loading={this.$daily.listFetching}>
				<div className={css}>
					<Border className="date-bar">
						{
							['今天', '昨天', '前天'].map((res, i) => {
								if (i == date) {
									return <p key={i}>{res}</p>
								}
								return (
									<a key={i}
										href="javascript:;"
										onClick={this.changeDate.bind(this, i)}>
										{res}
									</a>
								)
							})
						}
					</Border>
					{
						list.length > 0 ?
						list.map((res,i) => {

							const time = new Date(res.updateTime).Format('hh:mm:ss')

							// const time = timeagoInstance.format(res.updateTime, 'zh_CN')

							return (
								<div className="daily-item" key={res._id||i}>
									<UserHeader name={res.uid.nickname} className="header" uid={res.uid._id} link={'/user/'+res.uid._id} />
									<Border className="daily-bd">
										<h1>
											<Link to={'/user/'+res.uid._id}>{res.uid.nickname}</Link>
											<time>更新于 {time}</time>
										</h1>

										<Dailys resource={res.dailyList} />

									</Border>
								</div>
							)
						}) :
						<p className="daily-item--empty">还没有人提交日报哦~</p>
					}
				</div>
			</Spin>
		)
	}
}

export default UserDailyList