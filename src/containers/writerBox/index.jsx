import './style'
import React, {Component} from 'react'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import RecordInput from 'src/components/recordInput'
import Spin from 'src/components/spin'

@injectStore
@reactStateData
class WriterBox extends Component {
	constructor(props) {
		super(props)

		this.setData({
			rewriting: false,
			rewriteLoading: false,
		})
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	async fetch() {
		this.$user.fetchTodayDaily()
	}

	rewriteStart() {
		this.data.rewriting = true
	}

	async rewriteSubmit(res) {
		await this.$user.updateTodayDaily(res)
		this.data.rewriting = false
	}

	render() {
		
		// 管理员身份无法写日报，也不获取本人日报数据
		if (this.$user.info && this.$user.info.role === 1) {
			return null
		}

		this.fetch()

		return (
			<div className="writer-box">
				<i className="icon" />
				<Border className="con">
					{
						this.$user.todayFetching ?
						<Spin loading height={150} /> :
						<Dailys className="my-daily"
							rewriteabled
							onRewrite={::this.rewriteStart}
							onRewriteSubmit={::this.rewriteSubmit}
							resource={this.$user.today} />
					}
					{
						this.data.rewriting ?
						null :
						<RecordInput className="newrecord" disabled={this.$user.todayFetching} loading={false} />
					}
				</Border>
			</div>
		)
	}
}

export default WriterBox