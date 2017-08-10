import './style'
import React from 'react'
import cn from 'classnames'


const Button = props => {
	const css = cn('app-button', props.className, {
		'app-button--loading': props.loading
	})

	const load = (
		<div className="x-loading__spin">
			<svg className="x-loading__spin_circular" viewBox="25 25 50 50">
				<circle className="x-loading__spin_path" cx="50" cy="50" r="20" fill="none" strokeWidth="4" strokeMiterlimit="10"/>
			</svg>
		</div>
	)

	return (
		<a className={css} onClick={props.onClick}>
			{ props.loading ? load : null }
			{ props.children }
		</a>
	)
}

export default Button