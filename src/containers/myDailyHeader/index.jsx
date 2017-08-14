import './style'
import React, {Component} from 'react'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import UserHeader from 'src/components/userHeader'
import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import Spin from 'src/components/spin'

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
		})
	}

	componentDidMount() {
		this.fetch()
	}

	fetch() {
		this.$user.fetchChart()
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

	showSomeDay() {
		this.data.somedayVisible = true
	}

	renderGrid(chart) {
		const total = chart.length
		const col = Math.ceil(total / 7)
		const grid = []
		for (let i = 0; i < col; i++) {
			let comp = (
				<div key={i} className="col">
					{
						[0,1,2,3,4,5,6].map((res, j) => {
							const index = i * 7 + j
							if (index < total) {
								const c = chart[index].recordCount
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
										data-t={chart[index].date}
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
					<li>Aug</li>
					<li>Sep</li>
					<li>Oct</li>
					<li>Nov</li>
					<li>Dec</li>
					<li>Jan</li>
					<li>Feb</li>
					<li>Mar</li>
					<li>Apr</li>
					<li>May</li>
					<li>Jun</li>
					<li>Jul</li>
					<li></li>
				</ul>
				<div className="bd">
					<div className="gridchart"
						onMouseOver={::this.gridMouseOver}
						onClick={::this.showSomeDay}
						onMouseLeave={e => this.data.dateVisible = false}>
						{
							this.data.dateVisible ?
							<p className="date" style={{left:this.data.dateX+'px',top:this.data.dateY+'px'}}>
								{
									this.data.dateC > 1 ?
									this.data.dateC + ' records ' :
									this.data.dateC == 0 ?
									'No records ' :
									this.data.dateC + ' record '
								}<span>on {this.data.dateT}</span>
							</p> :
							null
						}
						{grid}
					</div>
				</div>
				<div className="tips">
					<p>Less</p>
					<i className="i0" />
					<i className="i1" />
					<i className="i2" />
					<i className="i3" />
					<p>More</p>
				</div>
			</div>
		)
	}

	render() {
		
		const user = this.$user

		return (
			<div className="my-daily-header">
				{
					user.info ?
					<UserHeader colorful name={user.info.userName} uid={user.info.uid} className="header" /> :
					<UserHeader name="" className="header" />
				}
				<Border className="main">
					
					{
						user.info ?
						<h1>{user.info.userName}<span>{user.info.groupName}</span></h1> :
						<h1 style={{opacity:0.1}}>Loading...</h1>
					}
					
					{
						user.chartFetching ?
						<Spin loading={true} height={138} /> :
						user.chart.length > 0 ?
						this.renderGrid(user.chart) :
						null
					}

					{
						this.data.somedayVisible ?
						<div className="someday">
							<h1>2017 5-12</h1>
							<a href="javascript:;"
								className="close"
								onClick={e => this.data.somedayVisible = false}>Close</a>
							<Dailys />
						</div> :
						null
					}
				</Border>
			</div>
		)
	}
}

export default MyDailyHeader