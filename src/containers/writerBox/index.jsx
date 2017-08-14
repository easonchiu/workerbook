import './style'
import React, {Component} from 'react'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import RecordInput from 'src/components/recordInput'

@injectStore
class WriterBox extends Component {
	constructor(props) {
		super(props)
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		this.fetch()
	}

	async fetch() {
		this.$user.fetchTodayDaily()
	}

	render() {
		console.log(this.$user.today)
		return (
			<div className="writer-box">
				<i className="icon" />
				<Border className="con">
					<Dailys className="my-daily" large rewriteabled resource={this.$user.today} />
					<RecordInput className="newrecord" loading={false} />
				</Border>
			</div>
		)
	}
}

export default WriterBox