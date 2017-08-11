import './style'
import React, {Component} from 'react'
import cn from 'classnames'
import {Link} from 'react-router-dom'
import qs from 'qs'

import connect from 'src/mobx'
import reactStateData from 'react-state-data'
import {observer} from 'mobx-react'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import UserHeader from 'src/components/userHeader'
import Spin from 'src/components/spin'

@connect
@reactStateData
@observer
class UserDailyList extends Component {
	constructor(props) {
		super(props)

		this.setData({
			loading: true
		})
	}

	componentDidMount() {
		const {gid} = qs.parse(this.props.location.search, {ignoreQueryPrefix:true})
		this.fetchData(gid, true)
	}

	componentWillReceiveProps(nextProps) {
		const {gid:ogid} = qs.parse(this.props.location.search, {ignoreQueryPrefix:true})
		const {gid:ngid} = qs.parse(nextProps.location.search, {ignoreQueryPrefix:true})
		
		if (ogid !== ngid) {
			this.fetchData(ngid)
		}
	}

	async fetchData(gid, loading = false) {
		if (loading) {
			this.data.loading = loading
			await this.props.$daily.fetchList()
			this.data.loading = false
		} else {
			this.props.$daily.fetchList()
		}
	}

	render() {

		const css = cn('user-daily-list', this.props.className)

		const list = this.props.$daily.list

		return (
			<Spin loading={this.data.loading}>
				<div className={css}>
					<Border className="date-bar">
						<a href="javascript:;" className="active">Today</a>
						<a href="javascript:;">Aug 8, 2017</a>
						<a href="javascript:;">Aug 7, 2017</a>
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