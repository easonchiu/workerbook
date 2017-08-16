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
		this.fetch()
	}

	fetch() {
		this.$user.fetchMyDaily()
	}

	render() {
		const list = this.$user.daily

		const css = cn('my-daily-list', this.props.className)

		return (
			<div className={css}>
				{
					list.map(res => (
						<div className="daily-item" key={res.updateTime}>
							<Border className="daily-bd">
								<h1>
									<time>{res.updateTime}</time>
								</h1>

								<Dailys resource={res.daily} />

							</Border>
						</div>
					))
				}
			</div>
		)
	}
}

export default MyDailyList