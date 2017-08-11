import './style'
import React, {Component} from 'react'

import connect from 'src/mobx'
import reactStateData from 'react-state-data'
import {observer} from 'mobx-react'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import RecordInput from 'src/components/recordInput'

@connect
@reactStateData
@observer
class WriterBox extends Component {
	constructor(props) {
		super(props)
	}

	click() {
		this.props.$daily.fetchList()
	}

	render() {
		return (
			<div className="writer-box">
				<i className="icon" onClick={::this.click} />
				<Border className="con">
					<Dailys className="my-daily" rewriteabled />
					<RecordInput className="newrecord" loading={false} />
				</Border>
			</div>
		)
	}
}

export default WriterBox