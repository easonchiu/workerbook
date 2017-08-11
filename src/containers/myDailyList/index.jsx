import './style'
import React from 'react'
import cn from 'classnames'
import {Link} from 'react-router-dom'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'


const DailyList = props => {
	const arr = [3,4,5,6,7,8]
	const css = cn('my-daily-list', props.className)
	return (
		<div className={css}>
			{
				arr.map((res,i) => (
					<div className="daily-item" key={i}>
						<Border className="daily-bd">
							<h1>
								<time>12:30</time>
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