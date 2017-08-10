import './style'
import React, { Component } from 'react'
import cn from 'classnames'

import RecordInput from 'src/components/recordInput'


class Dailys extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		// <li><RecordInput btnText="Rewrite" /></li>
		const css = cn('app-dailys', this.props.className)
		return (
			<ul className={css}>
				<li>
					<span><sub /></span>
					<p>整理产品原型，设计稿整理</p>
					{
						this.props.rewriteabled ?
						<div className="tools">
							<a href="javascript:;">Rewrite</a>
							<a href="javascript:;">Delete</a>
						</div> :
						null
					}
				</li>
				
				<li>
					<span><sub /></span>
					<p>安联代步车什么代码bug修复</p>
					{
						this.props.rewriteabled ?
						<div className="tools">
							<a href="javascript:;">Rewrite</a>
							<a href="javascript:;">Delete</a>
						</div> :
						null
					}
				</li>
				<li>
					<span><sub /></span>
					<p>吃饭睡觉写代码</p>
					{
						this.props.rewriteabled ?
						<div className="tools">
							<a href="javascript:;">Rewrite</a>
							<a href="javascript:;">Delete</a>
						</div> :
						null
					}
				</li>
			</ul>
		)
	}
}

export default Dailys