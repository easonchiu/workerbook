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
			rewriteProject: '',
			rewriteProjectId: '',
			loading: false,
		})
	}

	rewrite({_id, progress, record, pname, pid}) {
		this.data.rewrite = _id
		this.data.rewriteRecord = record
		this.data.rewriteProgress = progress
		this.data.rewriteProject = pname
		this.data.rewriteProjectId = pid

		this.props.onRewrite && this.props.onRewrite()
	}

	delete(id) {
		this.props.onDelete && this.props.onDelete(id)
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
		this.data.rewriteProject = res.pname
		this.data.rewriteProjectId = res.pid
	}

	render() {
		const css = cn('app-dailys', this.props.className, {
			'app-dailys--rewrite': this.data.rewrite
		})
		const list = this.props.resource || []

		return (
			<ul className={css}>
				{
					list.length > 0 ?
					list.map(res => (
						this.data.rewrite === res._id ?
						<li key={res._id} className="rewrite">
							<div className="box">
								<Circle progress={this.data.rewriteProgress} />
								{
									this.data.rewriteRecord ?
									<p className="record">
										{
											this.data.rewriteProject ?
											<strong>{this.data.rewriteProject}</strong> :
											null
										}
										{this.data.rewriteRecord}
									</p> :
									<p className="record empty">请输入...</p>
								}
							</div>
							<RecordInput
								projects={this.props.projects}
								loading={this.data.loading}
								record={this.data.rewriteRecord}
								progress={this.data.rewriteProgress}
								onChange={::this.onRecordInputChange}
								project={this.data.rewriteProject}
								projectId={this.data.rewriteProjectId}
								className="rewriterecord"
								btnText="修改"
								onSubmit={::this.rewriteSubmit} />
						</li> :
						<li key={res._id}>
							<Circle progress={res.progress} tips={!this.props.rewriteabled} />
							<p className="record">
								{
									res.pname ?
									<strong>{res.pname}</strong> :
									null
								}
								{res.record}
							</p>
							{
								this.props.rewriteabled && !this.data.rewrite ?
								<div className="tools">
									<a href="javascript:;" onClick={this.rewrite.bind(this, res)}>修改</a>
									<a href="javascript:;" onClick={this.delete.bind(this, res._id)}>删除</a>
								</div> :
								null
							}
						</li>
					)) :
					<li className="empty">暂无数据</li>
				}
			</ul>
		)
	}
}

export default Dailys