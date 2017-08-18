import './style'
import React, {Component, cloneElement} from 'react'

const Option = props => {
	return (
		<li className={props.active?'active':''} onClick={props.onClick.bind(props.value)}>{props.text}</li>
	)
}

class Select extends Component {
	constructor(props) {
		super(props)
		this.state = {
			li: false
		}

		this.bodyClick =  this.bodyClick.bind(this)
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.bodyClick)
	}

	bodyClick(e) {
		document.body.removeEventListener('click', this.bodyClick)
		setTimeout(e => {
			this.setState({
				li: false
			})
		})
	}

	openLi() {
		this.setState({
			li: !this.state.li
		}, e => {
			if (this.state.li) {
				document.body.addEventListener('click', this.bodyClick)
			} else {
				document.body.removeEventListener('click', this.bodyClick)
			}
		})
	}

	onClick(val) {
		document.body.removeEventListener('click', this.bodyClick)
		this.props.onChange(val)
	}

	render() {
		const props = this.props

		let value = ''

		let children = []
		
		props.children.map(res => {
			if (Array.isArray(res)) {
				res.map(_res => {
					if (_res.type === Option) {
						children.push(_res)
					}
				})
			} else if (res.type === Option) {
				children.push(res)
			}
		})

		children = children.map(res => {
			let active = false
			if (res.props.value == props.value) {
				value = res.props.text
				active = true
			}
			return cloneElement(res, {
				onClick: this.onClick.bind(this, res.props.value),
				active: active,
				key: res.props.value
			})
		})

		return (
			<div className="app-select">
				<p onClick={::this.openLi}>{value}</p>
				{
					this.state.li ?
					<ul className="app-select__popup">
						{children}
					</ul> :
					null
				}
			</div>
		)
	}
}




Select.Option = Option

export default Select