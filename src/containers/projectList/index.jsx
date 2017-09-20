import './style'
import React, {Component} from 'react'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import Dialog from 'src/components/dialog'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Spin from 'src/components/spin'
import Toast from 'src/components/toast'
import Select from 'src/components/select'

@injectStore
@reactStateData
class ProjectList extends Component {
	
	constructor(props) {
		super(props)
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {

	}

	render() {

		if (!this.$user.info) {
			return null
		}

		const group = this.$group.list || []

		const {page, id = 'all'} = this.props.match.params

		const userInfo = this.$user.info || {}

		return (
			<Border className="app-project-list">
				<h1>项目分类</h1>
				
				<Spin loading={this.$group.listFetching} height={200}>
					<ul>
						<li className="active"><p><i />全部</p></li>
						<li><a href="javascript:;"><i />某某项目</a></li>
						<li><a href="javascript:;"><i />某某项目</a></li>
						<li><a href="javascript:;"><i />某某项目</a></li>
					</ul>
				</Spin>
				

			</Border>
		)
	}
}

export default ProjectList