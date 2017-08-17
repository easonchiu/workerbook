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
			showProgressBar: false,
			progress: props.progress || 100,
			record: props.record || ''
		}, this.watch)

		this.processLineMouseUp = this.processLineMouseUp.bind(this)

		this.progressLineLock = true
	}

	watch() {
		return {
			showProgressBar(v) {
				if (!v) {
					this.progressLineLock = true
				}
			},
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

	processLineMouseDown(e) {
		this.progressLineLock = false
		this.changeProgress(e)
		window.addEventListener('mouseup', this.processLineMouseUp)
	}

	processLineMouseUp() {
		this.progressLineLock = true
		window.removeEventListener('mouseup', this.processLineMouseUp)
	}

	changeProgress(e) {
		if (!this.progressLineLock) {
			const x = e.clientX - e.target.offsetLeft - 5
			const w = e.target.offsetWidth - 10
			let p = Math.round(x / w * 100)
			p = p > 100 ? 100 : p < 5 ? 5 : p
			this.data.progress = p
		}
	}

	titleClick() {
		if (!this.props.loading) {
			this.data.showProgressBar = !this.data.showProgressBar
		}
	}

	inputChange(e) {
		const val = e.target.value.trim().substr(0,500)
		this.data.record = val
	}

	submit() {
		this.data.showProgressBar = false

		if (this.data.record == '') {
			Toast.show('内容不能为空')
		} else {
			this.props.onSubmit && this.props.onSubmit({
				record: this.data.record,
				progress: this.data.progress
			})
		}
	}

	render() {
		const css = cn('app-record-input', this.props.className, {
			'app-record-input--loading': this.props.loading,
			'app-record-input--disabled': this.props.disabled,
		})
		return (
			<div className={css}>
				<div className="input">
					<a href="javascript:;" className="progress-title" onClick={::this.titleClick}>
						{
							this.data.progress === 100 ?
							<p>已完成</p> :
							<p>完成度<span>{this.data.progress}%</span></p>
						}
					</a>
					{
						this.data.showProgressBar && !this.props.loading ?
						<div className="progress">
							<div className="line"
								onMouseDown={::this.processLineMouseDown}
								onMouseMove={::this.changeProgress}>
								<span style={{width:this.data.progress+'%'}} />
							</div>
							<a href="javascript:;"
								className="done"
								onClick={e => this.data.showProgressBar = false}>确定</a>
						</div> :
						<Input className="in"
							value={this.data.record}
							onChange={::this.inputChange}
							disabled={this.props.loading||this.props.disabled}
							placeholder="请输入日报内容" />
					}
				</div>
				<Button loading={this.props.loading}
					disabled={this.props.disabled}
					onClick={::this.submit}
					className="btn">{this.props.btnText||'发布一条'}</Button>
			</div>
		)
	}
}

export default RecordInput