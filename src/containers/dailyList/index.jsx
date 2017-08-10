import './style'
import React from 'react'
import cn from 'classnames'
import {Link} from 'react-router-dom'

import Border from 'src/containers/border'
import Dailys from 'src/components/dailys'
import UserHeader from 'src/components/userHeader'


const DailyList = props => {
	const arr = [3,4,5,6,7,8]
	const css = cn('daily-list', props.className)
	return (
		<div className={css}>
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