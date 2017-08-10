import './style'
import React from 'react'
import cn from 'classnames'


const Input = props => {
	const css = cn('app-input', props.className, {
		'app-input--disabled': props.disabled
	})
	return (
		<input {...props} placeholder={props.placeholder} className={css} type={props.type ? props.type : 'text'} />
	)
}

export default Input