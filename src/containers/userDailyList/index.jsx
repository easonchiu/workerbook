import './style'
import React from 'react'
import cn from 'classnames'
import {Link} from 'react-router-dom'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import UserHeader from 'src/components/userHeader'


const DailyList = props => {
	const arr = [3,4,5,6,7,8]
	const css = cn('user-daily-list', props.className)
	return (
		<div className={css}>
			<Border className="date-bar">
				<a href="javascript:;" className="active">Today</a>
				<a href="javascript:;">Aug 8, 2017</a>
				<a href="javascript:;">Aug 7, 2017</a>
			</Border>
			{
				arr.map((res,i) => (
					<div className="daily-item" key={i}>
						<UserHeader name="Eason" className="header" uid={res} link />
						<Border className="daily-bd">
							<h1>
								<time>12:30</time>
								<Link to="/home/1">Eason.Chiu</Link>
							</h1>

							<Dailys />

						</Border>
					</div>
				))
			}
		</div>
	)
}

export default DailyList