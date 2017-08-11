import './style'
import React, { Component } from 'react'
import cn from 'classnames'

import RecordInput from 'src/components/recordInput'
import Circle from 'src/components/circle'


class Dailys extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		// <li><RecordInput btnText="Rewrite" /></li>
		const css = cn('app-dailys', this.props.className)
		const list = this.props.resource || []

		return (
			<ul className={css}>
				{
					list.map(res => (
						<li key={res.id}>
							<Circle progress={res.progress} />
							<p>{res.record}</p>
							{
								this.props.rewriteabled ?
								<div className="tools">
									<a href="javascript:;">Rewrite</a>
									<a href="javascript:;">Delete</a>
								</div> :
								null
							}
						</li>
					))
				}
			</ul>
		)
	}
}

export default Dailys