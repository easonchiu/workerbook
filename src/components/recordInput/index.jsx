import './style'
import React, {Component} from 'react'
import reactStateData from 'react-state-data'
import cn from 'classnames'

import Button from 'src/components/button'
import Input from 'src/components/input'


@reactStateData
class RecordInput extends Component {
	constructor(props) {
		super(props)

		this.setData({
			showProcessBar: false,
			process: 100,
		}, this.watch)

		this.processLineMouseUp = this.processLineMouseUp.bind(this)

		this.processLineLock = true
	}

	watch() {
		return {
			showProcessBar(v) {
				if (!v) {
					this.processLineLock = true
				}
			}
		}
	}

	processLineMouseDown(e) {
		this.processLineLock = false
		this.changeProcess(e)
		window.addEventListener('mouseup', this.processLineMouseUp)
	}

	processLineMouseUp() {
		this.processLineLock = true
		window.removeEventListener('mouseup', this.processLineMouseUp)
	}

	changeProcess(e) {
		if (!this.processLineLock) {
			const x = e.clientX - e.target.offsetLeft - 5
			const w = e.target.offsetWidth - 10
			let p = Math.round(x / w * 100)
			p = p > 100 ? 100 : p < 5 ? 5 : p
			this.data.process = p
		}
	}

	titleClick() {
		if (!this.props.loading) {
			this.data.showProcessBar = !this.data.showProcessBar
		}
	}

	render() {
		const css = cn('app-record-input', this.props.className, {
			'app-record-input--loading': this.props.loading
		})
		return (
			<div className={css}>
				<div className="input">
					<a href="javascript:;" className="process-title" onClick={::this.titleClick}>
						Process<span>{this.data.process}%</span>
					</a>
					{
						this.data.showProcessBar && !this.props.loading ?
						<div className="process">
							<div className="line"
								onMouseDown={::this.processLineMouseDown}
								onMouseMove={::this.changeProcess}>
								<span style={{width:this.data.process+'%'}} />
							</div>
							<a href="javascript:;"
								className="done"
								onClick={e => this.data.showProcessBar = false}>Done</a>
						</div> :
						<Input className="in" value="12312312" onChange={e=>{}} disabled={this.props.loading} placeholder="New record" />
					}
				</div>
				<Button loading={this.props.loading} className="btn">{this.props.btnText||'Send'}</Button>
			</div>
		)
	}
}

export default RecordInput