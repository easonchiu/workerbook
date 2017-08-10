import './style'
import React from 'react'
import cn from 'classnames'

import {Link} from 'react-router-dom'

const UserHeader = props => {
	const uid = props.uid ? props.uid : 0
	
	let name = props.name
	let big = false

	if ((/(^[a-z]+$)/gi).test(name) && name.length > 6) {
		// 全部为英文的名字，如果超过6个字母，只保留首字母，使用大号字体
		name = name.substr(0, 1).toUpperCase()
		big = true
	} else if ((/\./i).test(name)) {
		// 如果有点，取点前半段，同样如果超过6个字母，保留首字母，使用大号字体
		name = name.split('.')[0]
		if (name.length > 6) {
			name = name.substr(0, 1).toUpperCase()
			big = true
		}
	} else if (!(/([a-z]+)/gi).test(name)) {
		// 如果非英文名，则认为包含中文等其他，超过3个字，取名，否则取姓
		if (name.length >= 3) {
			name = name.substr(-2)
		} else if (name.length == 1) {
			big = true
		}
	}

	const css = cn('user-header', props.className, 'c' + uid % 6, {
		'user-header--big-font': big
	})

	if (props.link && uid !== 0) {
		return (
			<Link className={css} to={'/home/'+uid}>
				<p><span /><em>{props.name}</em></p>
				{name}
			</Link>
		)
	}
	return (
		<div className={css}>
			{name}
		</div>
	)
}

export default UserHeader