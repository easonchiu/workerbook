import './style'
import React, {Component} from 'react'
import qs from 'qs'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import UserHeader from 'src/components/userHeader'
import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import Spin from 'src/components/spin'
import Toast from 'src/components/toast'

@injectStore
@reactStateData
class MyDailyHeader extends Component {
	constructor(props) {
		super(props)

		this.setData({
			dateVisible: false,
			dateX: 0,
			dateY: 0,
			dateC: 0,
			dateT: 0,
			somedayVisible: false,
			somedayTime: '',
			somedayLoading: false,
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

	componentDidMount() {
		const {uid} = this.getSearch()
		if (uid) {
			this.fetch(uid)
		}

		this.listen = this.props.history.listen(this.hashChange)
	}

	hashChange = e => {
		setTimeout(e => {
			const {uid} = this.getSearch()
			this.fetch(uid)
		})
	}

	componentWillUnmount() {
		this.listen()
	}

	async fetch(uid) {
		try {
			await this.$daily.fetchDailyDashboardByUid(uid)
		} catch(e) {

		}
	}
	
	gridMouseOver(e) {
		const {x,y,c,t} = e.target.dataset
		if (x !== undefined && y !== undefined) {
			this.data.dateVisible = true
			this.data.dateX = 12 * x
			this.data.dateY = 12 * y
			this.data.dateC = c
			this.data.dateT = t
		}
	}

	async showSomeDay(e) {
		try {
			const {dt,t,c} = e.target.dataset
			if (c > 0) {
				this.data.somedayTime = t
				this.data.somedayVisible = true
				this.data.somedayLoading = true
				
				await this.$daily.fetchDayDailyWithDateAndUid(dt, this.getSearch().uid)
			}
		} catch(e) {
			Toast.show(e.msg)
		}
		this.data.somedayLoading = false
	}

	renderGrid(chart) {

		const total = chart.length
		const col = Math.ceil(total / 7)
		const grid = []

		const header = []
		let currentM

		for (let i = 0; i < col; i++) {
			let comp = (
				<div key={i} className="col">
					{
						[0,1,2,3,4,5,6].map((res, j) => {
							const index = i * 7 + j
							if (index < total) {
								const date = new Date(chart[index].day)
								const t = date.Format('yyyy年M月d日')
								const c = chart[index].count
								
								if (j == 0) {
									const m = date.Format('M')
									if (m !== currentM) {
										currentM = m
										header.push(<li style={{left:i*12+'px'}} key={i}>{m}月</li>)
									}
								}

								let cn = 0
								if (c > 4) {
									cn = 3
								} else if (c > 2) {
									cn = 2
								} else if (c > 0) {
									cn = 1
								}
								return <i key={i+'-'+j}
										data-x={i}
										data-y={j}
										data-c={c}
										data-t={t}
										data-dt={chart[index].day}
										className={'i'+cn} />
							}
						})
					}
				</div>
			)
			grid.push(comp)
		}

		return (
			<div className="grid">
				<ul className="hd">
					{header}
				</ul>
				<div className="bd">
					<div className="aside">
						<span>周一</span>
						<span>周三</span>
						<span>周五</span>
					</div>
					<div className="gridchart"
						onMouseOver={::this.gridMouseOver}
						onClick={::this.showSomeDay}
						onMouseLeave={e => this.data.dateVisible = false}>
						{
							this.data.dateVisible ?
							<p className="date" style={{left:this.data.dateX+'px',top:this.data.dateY+'px'}}>
								{
									this.data.dateC > 0 ?
									this.data.dateC + '条日报 ' :
									'没有日报 '
								}<span>{this.data.dateT}</span>
							</p> :
							null
						}
						{grid}
					</div>
				</div>
				<div className="tips">
					<p>提交量</p>
					<i className="i0" />
					<i className="i1" />
					<i className="i2" />
					<i className="i3" />
				</div>
			</div>
		)
	}

	render() {
		
		const info = this.$daily.dashboard || { dayList: [], userInfo: {} }

		const userInfo = info.userInfo || {}

		const chart = info.dayList || {}

		return (
			<div className="my-daily-header">
				{
					userInfo._id ?
					<UserHeader name={userInfo.nickname} uid={userInfo._id} className="header" /> :
					<UserHeader className="header" hidden />
				}
				<Border className="main">
					
					{
						userInfo._id ?
						<h1>{userInfo.nickname}<span>{userInfo.gid.name}</span></h1> :
						<h1 style={{opacity:0.1}}>加载中...</h1>
					}
					
					{
						this.$daily.dashboardFetching ?
						<Spin loading={true} height={123} /> :
						chart.length > 0 ?
						this.renderGrid(chart) :
						null
					}

					{
						this.data.somedayVisible ?
						<div className="someday">
							<h1>{this.data.somedayTime}</h1>
							<a href="javascript:;"
								className="close"
								onClick={e => this.data.somedayVisible = false}>关闭</a>
							{
								this.data.somedayLoading ?
								<Spin loading height={120} /> :
								<Dailys resource={this.$daily.someday.dailyList} />
							}
						</div> :
						null
					}
				</Border>
			</div>
		)
	}
}

export default MyDailyHeader