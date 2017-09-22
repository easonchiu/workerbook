import './style'
import React, {Component} from 'react'
import cn from 'classnames'
import {Link} from 'react-router-dom'
import qs from 'qs'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'

@injectStore
@reactStateData
class MyDailyList extends Component {
	constructor(props) {
		super(props)

	}

	getSearch() {
		let search = this.props.location.search
		if (search) {
			search = search.replace(/\?/, '')
			return qs.parse(search)
		}
		return {}
	}

	componentDidMount() {
		const {uid} = this.getSearch()
		if (uid) {
			this.fetch(uid)
		}
	}

	fetch(uid) {
		this.$daily.fetchHistoryDailyWithUid(uid)
	}

	render() {
		const list = this.$daily.myHistory || []

		const css = cn('my-daily-list', this.props.className)

		return (
			<div className={css}>
				{
					list.length > 0 ?
					<div className="daily-list">
					{
						list.map(res => {
							const time = new Date(res.updateTime).Format('yyyy年M月d hh:mm:ss')
							return (
								<div className="daily-item" key={res._id}>
									<Border className="daily-bd">
										<h1>
											<time>{time}</time>
										</h1>

										<Dailys resource={res.dailyList} />

									</Border>
								</div>
							)
						})
					}
					</div> :
					<p className="daily-item--empty">暂无日报数据</p>
				}
			</div>
		)
	}
}

export default MyDailyList