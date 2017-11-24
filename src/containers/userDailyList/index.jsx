import './style'
import React, {Component} from 'react'
import cn from 'classnames'
import {Link} from 'react-router-dom'
import qs from 'qs'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import UserHeader from 'src/components/userHeader'
import Spin from 'src/components/spin'
import Toast from 'src/components/toast'

@injectStore
@reactStateData
class UserDailyList extends Component {
	constructor(props) {
		super(props)

		this.setData({
			showDatePopup: false
		})
		
		this.dateList = this.getDateList(30)
		this.bodyClick =  this.bodyClick.bind(this)
	}

	getSearch() {
		let search = this.props.location.search
		if (search) {
			search = search.replace(/\?/, '')
			return qs.parse(search)
		}
		return {}
	}

	getDateList(length) {
		const day = new Date()
		day.setDate(day.getDate() - 2)
		const list = []
		for (let i = 0; i < length; i++) {
			day.setDate(day.getDate() - 1)
			list.push({
				str: day.Format('M月d日'),
				date: day.Format('yyyy-MM-dd')
			})
		}
		return list
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		const {gid, date = 0, pid = ''} = this.getSearch()
		this.fetch(gid, date, pid)
	}

	async fetch(gid, date, pid) {
		try {
			await this.$daily.fetchDailyListWithGroupAndDate(gid, date, pid)
		} catch(e) {
			Toast.show(e.msg)
		}
	}

	changeDate(val = '') {
		const search = this.getSearch()

		if (search.date != val) {
			search.date = val
			this.props.history.push(`/index?${qs.stringify(search)}`)
			this.fetch(search.gid, val)
		}
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.bodyClick)
	}

	bodyClick(e) {
		if (this.data.showDatePopup) {
			document.body.removeEventListener('click', this.bodyClick)
			setTimeout(e => {
				this.data.showDatePopup = false
			})
		}
	}

	openPopup() {
		this.data.showDatePopup = true
		document.body.addEventListener('click', this.bodyClick)
	}

	render() {

		const css = cn('user-daily-list', this.props.className)

		const list = this.$daily.list || []

		const {date = 0} = this.getSearch()

		const strDate = this.dateList.filter(res => res.date == date)[0]

		// 用户数据
		let users = this.$user.all || []

		const {gid = ''} = this.getSearch()

		if (gid !== '') {
			users = users.filter(res => {
				return res.gid == gid
			})
		}

		// 查找谁没写日报（今天不算）
		const noWriteUsers = []
		if (date != 0 &&
			list.length > 0 &&
			users.length > 0 &&
			!this.$daily.listFetching) {
			users.map(res => {
				let hasWrite = false
				list.map(lres => {
					if (lres.uid._id === res._id) {
						hasWrite = true
					}
				})
				if (!hasWrite) {
					noWriteUsers.push(res.nickname)
				}
			})
		}

		return (
			<div className={css}>
				<Border className="top-bar">
					<div className="date-bar">
					{
						['今天', '昨天', '前天'].map((res, i) => {
							if (i == date) {
								return <p key={i}>{res}</p>
							}
							return (
								<a key={i}
									href="javascript:;"
									onClick={this.changeDate.bind(this, i)}>
									{res}
								</a>
							)
						})
					}
					{
						strDate ?
						<p>{strDate.str}</p> :
						null
					}
					
					<a href="javascript:;" className="more" onClick={::this.openPopup}>更多<sub /></a>
					{
						this.data.showDatePopup ?
						<div className="popup">
							<ul>
								{
									this.dateList.map((res, i) => (
										<li key={i}
											onClick={this.changeDate.bind(this, res.date)}
											className={date == res.date ? 'active' : ''}>
											<a href="javascript:;">{res.str}</a>
										</li>
									))
								}
							</ul>
						</div> :
						null
					}
					</div>
				</Border>
				
				{
					noWriteUsers.length ?
					<div className="tips-bar">
						{
							noWriteUsers.join('、')
						}
						&nbsp;未填写该天日报
					</div> :
					null
				}
				

				<Spin loading={this.$daily.listFetching} height={200}>
					{
						list.length ?
						<div className="daily-list">
						{
							list.map((res,i) => {

								const time = new Date(res.updateTime).Format('hh:mm:ss')

								return (
									<div className="daily-item" key={res._id||i}>
										<UserHeader
											name={res.uid.nickname}
											className="header"
											uid={res.uid._id}
											link={`/user?uid=${res.uid._id}`} />
										<Border className="daily-bd">
											<h1>
												<Link to={`/user?uid=${res.uid._id}`}>{res.uid.nickname}</Link>
												<time>更新于 {time}</time>
											</h1>

											<Dailys resource={res.dailyList} />

										</Border>
									</div>
								)
							})
						}
						</div> :
						<p className="daily-item--empty">还没有人提交日报哦~</p>
					}
				</Spin>
			</div>
		)
	}
}

export default UserDailyList