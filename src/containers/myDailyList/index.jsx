import './style'
import React, {Component} from 'react'
import cn from 'classnames'
import {Link} from 'react-router-dom'

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

	componentDidMount() {
		this.fetch(this.props.match.params.uid)
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
			</div>
		)
	}
}

export default MyDailyList