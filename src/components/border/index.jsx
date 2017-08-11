import './style'
import React from 'react'

import cn from 'classnames'

const Border = props => {
	const css = cn('--border', props.className)
	return (
		<div className={css}>
			{ props.children }
		</div>
	)
}

export default Border