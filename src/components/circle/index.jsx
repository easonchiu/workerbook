import './style'
import React from 'react'
import cn from 'classnames'


const Circle = props => {

	var percent = (props.progress || 0) / 100, perimeter = Math.PI * 2 * 20
    const style = perimeter * percent + " " + perimeter * (1- percent)
	
	const css = cn('icon-circle', {
		'icon-circle--finished': percent === 1
	})

	if (percent === 1) {
		return <div className={css}></div>
	}
	
	return (
		<div className={css}>
			{
				props.tips ?
				<p><span /><em>{'完成度 ' + props.progress + '%'}</em></p> :
				null
			}
			<svg width="100" height="100" viewBox="0 0 100 100">
			    <circle cx="50" cy="50" r="20" strokeWidth="40" stroke="#e4ebf3" fill="none"></circle>
			    <circle cx="50" cy="50" r="20" strokeWidth="40" stroke="#6495ff" fill="none" transform="matrix(0,-1,1,0,0,100)" strokeDasharray={style}></circle>
			</svg>
		</div>
	)
}

export default Circle