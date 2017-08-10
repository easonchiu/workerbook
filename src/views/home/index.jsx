import styles from './style'
import React, { Component } from 'react'
import connect from 'src/mobx'
import reactStateData from 'react-state-data'
import {observer} from 'mobx-react'

import Header from 'src/containers/header'
import UserHeader from 'src/components/userHeader'
import Footer from 'src/containers/footer'
import GroupList from 'src/containers/groupList'
import Border from 'src/containers/border'
import Button from 'src/components/button'
import DailyList from 'src/containers/dailyList'
import Dailys from 'src/components/dailys'

@connect
@reactStateData
@observer
class ViewHome extends Component {
	constructor(props) {
		super(props)
		this.setData({
			dateVisible: false,
			dateX: 0,
			dateY: 0,
			somedayVisible: false,
		})
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	gridMouseOver(e) {
		const {x,y} = e.target.dataset
		if (x !== undefined && y !== undefined) {
			this.data.dateVisible = true
			this.data.dateX = 12 * x
			this.data.dateY = 12 * y
		}
	}

	showSomeDay() {
		this.data.somedayVisible = true
	}

	renderGrid() {
		const total = 365
		const col = Math.ceil(total / 7)
		const grid = []
		for (let i = 0; i < col; i++) {
			let comp = (
				<div key={i} className="col">
					{
						[0,1,2,3,4,5,6].map((res, j) => {
							const r = Math.floor(Math.random() * 4)
							return <i key={i+'-'+j} data-x={i} data-y={j} className={'i'+r} />
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
								4 records <span>on 2017-5-12</span>
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

	renderHomePage() {
		return (
			<div className="homepage">
				<UserHeader name="babyface" uid={1} className="header" />
				<Border className="main">
					<h1>Eason.Chiu<span>FE Department</span></h1>
					{this.renderGrid()}
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

	render() {
		return (
			<div className="view-home">
				
				<Header {...this.props} />

				<div className="app-main">
					
					<div className="app-body">
						
						{this.renderHomePage()}

						<DailyList className="list" />

					</div>

					<GroupList />

				</div>

				<Footer />

			</div>
		)
	}
}

export default ViewHome