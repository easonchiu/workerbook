import './style'
import React, {Component} from 'react'
import reactStateData from 'react-state-data'
import cn from 'classnames'

import Button from 'src/components/button'
import Input from 'src/components/input'
import Toast from 'src/components/toast'


@reactStateData
class RecordInput extends Component {
	constructor(props) {
		super(props)

		this.setData({
			showProgressPopup: false,
			progress: props.progress || 100,
			record: props.record || ''
		}, this.watch)
		
		this.bodyClick =  this.bodyClick.bind(this)
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.bodyClick)
	}

	bodyClick(e) {
		document.body.removeEventListener('click', this.bodyClick)
		clearTimeout(this.timer)
		this.timer = setTimeout(e => {
			this.data.showProgressPopup = false
		})
	}

	watch() {
		return {
			progress(v) {
				this.props.onChange && this.props.onChange({
					progress: v,
					record: this.data.record
				})
			},
			record(v) {
				this.props.onChange && this.props.onChange({
					progress: this.data.progress,
					record: v
				})
			}
		}
	}

	reset() {
		this.data.record = ''
		this.data.progress = 100
	}

	inputChange(e) {
		const val = e.target.value.substr(0,500)
		this.data.record = val
	}

	submit() {
		this.data.showProgressPopup = false

		const record = this.data.record.trim()

		if (record == '') {
			Toast.show('内容不能为空')
		} else {
			this.props.onSubmit && this.props.onSubmit({
				record: record,
				progress: this.data.progress
			})
		}
	}

	openPopup() {
		this.data.showProgressPopup = true
		document.body.addEventListener('click', this.bodyClick)
	}

	renderProgressBar() {
		const css = cn('btn', {
			'active': this.data.showProgressPopup
		})
		return (
			<div className="progress">
				<a href="javascript:;" className={css} onClick={::this.openPopup}>
					完成度<span>{this.data.progress}%</span><sub />
				</a>
				{
					this.data.showProgressPopup ?
					<div className="popup">
						<ul>
							{
								[5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
								.map(res => (
									<li key={res}
										onClick={e => this.data.progress = res}
										className={this.data.progress == res ? 'active' : ''}>
										<a href="javascript:;">{res}<span>%</span></a>
									</li>
								))
							}
						</ul>
					</div> :
					null
				}
			</div>
		)
	}

	render() {
		const css = cn('app-record-input', this.props.className, {
			'app-record-input--loading': this.props.loading,
			'app-record-input--disabled': this.props.disabled,
		})
		return (
			<div className={css}>
				<div className="input">
					<Input className="in"
						value={this.data.record}
						onChange={::this.inputChange}
						disabled={this.props.loading||this.props.disabled}
						mulit={true}
						placeholder="请输入日报内容" />
				</div>
				<div className="b">

					{this.renderProgressBar()}

					<Button loading={this.props.loading}
						disabled={this.props.disabled}
						onClick={::this.submit}
						className="submit">{this.props.btnText||'发布一条'}</Button>
				</div>
			</div>
		)
	}
}

export default RecordInput