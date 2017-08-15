import './style'
import React, { Component } from 'react'
import cn from 'classnames'

import reactStateData from 'react-state-data'

import RecordInput from 'src/components/recordInput'
import Circle from 'src/components/circle'

@reactStateData
class Dailys extends Component {
	constructor(props) {
		super(props)

		this.setData({
			rewrite: '',
			rewriteRecord: '',
			rewriteProgress: '',
			loading: false,
		})
	}

	rewrite(id, progress, record) {
		this.data.rewrite = id
		this.data.rewriteRecord = record
		this.data.rewriteProgress = progress

		this.props.onRewrite && this.props.onRewrite()
	}

	async rewriteSubmit(res) {
		this.data.loading = true
		this.props.onRewriteSubmit && await this.props.onRewriteSubmit({
			...res,
			id: this.data.rewrite
		})
		this.data.loading = false
		this.data.rewrite = ''
	}

	onRecordInputChange(res) {
		this.data.rewriteRecord = res.record
		this.data.rewriteProgress = res.progress
	}

	render() {
		const css = cn('app-dailys', this.props.className, {
			'app-dailys--rewrite': this.data.rewrite
		})
		const list = this.props.resource || []

		return (
			<ul className={css}>
				{
					list.map(res => (
						this.data.rewrite === res.id ?
						<li key={res.id} className="rewrite">
							<div className="box">
								<Circle progress={this.data.rewriteProgress} />
								{
									this.data.rewriteRecord ?
									<p className="record">{this.data.rewriteRecord}</p> :
									<p className="record empty">请输入...</p>
								}
							</div>
							<RecordInput
								loading={this.data.loading}
								record={this.data.rewriteRecord}
								progress={this.data.rewriteProgress}
								onChange={::this.onRecordInputChange}
								className="rewriterecord"
								btnText="修改"
								onSubmit={::this.rewriteSubmit} />
						</li> :
						<li key={res.id}>
							<Circle progress={res.progress} />
							<p className="record">{res.record}</p>
							{
								this.props.rewriteabled && !this.data.rewrite ?
								<div className="tools">
									<a href="javascript:;" onClick={this.rewrite.bind(this, res.id, res.progress, res.record)}>修改</a>
									<a href="javascript:;">删除</a>
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