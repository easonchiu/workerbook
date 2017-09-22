import './style'
import React, {Component} from 'react'
import qs from 'qs'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import RecordInput from 'src/components/recordInput'
import Spin from 'src/components/spin'
import Toast from 'src/components/toast'

@injectStore
@reactStateData
class WriterBox extends Component {
	constructor(props) {
		super(props)

		this.setData({
			rewriting: false,
			addDailyLoading: false,
		})
	}

	getSearch() {
		let search = this.props.location.search
		if (search) {
			search = search.replace(/\?/, '')
			return qs.parse(search)
		}
		return {}
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		this.fetch()
	}

	async fetch() {
		try {
			await this.$daily.fetchMyTodayDaily()
		} catch(e) {
			console.log(e)
		}
	}

	rewriteStart() {
		this.data.rewriting = true
	}

	async rewriteSubmit(res) {
		try {
			await this.$daily.update(res)
			await this.$daily.fetchMyTodayDaily()
			Toast.success('修改成功')
			await this.updateDailyList()
		} catch(e) {
			Toast.show(e.msg)
		}
		this.data.rewriting = false
	}

	async deleteDaily(id) {
		try {
			await this.$daily.delete({
				id
			})
			await this.$daily.fetchMyTodayDaily()
			Toast.success('删除成功')
			await this.updateDailyList()
		} catch(e) {
			Toast.show(e.msg)
		}
	}

	async newRecrodSubmit(res) {
		this.data.addDailyLoading = true
		try {
			await this.$daily.add(res)
			await this.$daily.fetchMyTodayDaily()
			Toast.success('添加成功')
			const input = this.refs.recordInput
			if (input && input.reset) {
				input.reset()
			}
			this.data.addDailyLoading = false
			await this.updateDailyList()
		} catch(e) {
			console.log(e)
			Toast.show(e.msg)
			this.data.addDailyLoading = false
		}
	}

	updateDailyList() {
		const {gid = '', date = '', pid = ''} = this.getSearch()
		return this.$daily.fetchDailyListWithGroupAndDate(gid, date, pid)
	}

	render() {
		
		// 管理员身份无法写日报
		if (!this.$user.info || this.$user.info.role === 1) {
			return null
		}

		const list = this.$daily.myToday.dailyList

		return (
			<div className="writer-box">
				<i className="icon" />
				<Border className="con">
					{
						this.$daily.myTodayFetching ?
						<Spin loading height={150} /> :
						list && list.length > 0 ?
						<Dailys className="my-daily"
							rewriteabled
							projects={this.$project.list}
							onRewrite={::this.rewriteStart}
							onRewriteSubmit={::this.rewriteSubmit}
							onDelete={::this.deleteDaily}
							resource={list} /> :
						<p className="empty">今天还没有写过日报哦~</p>
					}
					{
						this.data.rewriting ?
						null :
						<RecordInput className="newrecord"
							ref="recordInput"
							projects={this.$project.list}
							disabled={this.$daily.myTodayFetching}
							loading={this.data.addDailyLoading}
							onSubmit={::this.newRecrodSubmit} />
					}
				</Border>
			</div>
		)
	}
}

export default WriterBox