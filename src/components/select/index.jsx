import './style'
import React, {cloneElement} from 'react'

const Option = props => {
	return (
		<li onClick={props.onClick.bind(props.value)}>{props.text}</li>
	)
}

const Select = props => {
	
	let value = ''

	let children = props.children.map(res => {
		if (res.type !== Option) {
			return null
		}

		if (res.props.value == props.value) {
			value = res.props.text
		}

		return cloneElement(res, {
			onClick: props.onChange,
			key: res.props.value
		})
	})

	return (
		<div className="app-select">
			<p>{value}</p>
			<ul className="app-select__popup">
				{children}
			</ul>
		</div>
	)
}




Select.Option = Option

export default Select