import './style'
import React, { PureComponent } from 'react'

import Input from 'src/components/input'
import Button from 'src/components/button'

class MyDailyWriter extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      record: '',
      progress: 0,
      project: '',
    }
  }

  // 日报编写区 - 我已经写的日报
  renderMyDailyList() {
    const list = this.props.myDailyList
    return (
      <ul className="my-daily-list">
        {
          list && list.length ?
            list.map(i => (
              <li key={i.id}>
                <div className="progress">
                  {i.progress}
                </div>
                <p className="record">
                  {
                    i.pname ? <strong>{i.pname}</strong> : null
                  }
                  {i.record}
                </p>
                <div className="tools">
                  <a
                    href="javascript:;"
                    onClick={this.editDailyClick.bind(null, i.id)}
                  >
                    编辑
                  </a>
                  <a
                    href="javascript:;"
                    onClick={this.deleteDailyClick.bind(null, i.id)}
                  >
                    删除
                  </a>
                </div>
              </li>
            )) :
            null
        }
      </ul>
    )
  }

  // 日报编写区 - 新建日报面板
  renderWriter() {
    const list = this.props.projectList
    return (
      <div className="daily-writer-box">
        <Input
          multi={true}
          className="writer-input"
          placeholder="请输入日报内容"
          value={this.state.record}
          onChange={this.dailyWriterChange}
        />

        <div className="writer-tools">
          {
            list && list.length ?
              <select
                value={this.state.project}
                onChange={this.dailyProjectChange}
              >
                <option value={0}>项目归属</option>
                {
                  list.map(item => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))
                }
              </select> :
              null
          }

          <select
            value={this.state.progress}
            onChange={this.progressChange}
          >
            <option value={100}>完成度 100%</option>
            <option value={5}>完成度 5%</option>
            <option value={10}>完成度 10%</option>
            <option value={15}>完成度 15%</option>
            <option value={20}>完成度 20%</option>
          </select>

          <Button className="send-button" onClick={this.onAppend}>
            发布一条
          </Button>
        </div>
      </div>
    )
  }

  // 日报内容编辑
  dailyWriterChange = e => {
    this.setState({
      record: e.target.value
    })
  }

  // 项目归属编辑
  dailyProjectChange = e => {
    this.setState({
      project: e.target.value
    })
  }

  // 重新编辑我今天写的日报
  editDailyClick = id => {

  }

  // 删除我今天写的日报
  deleteDailyClick = id => {
    this.props.onDeleteItem &&
    this.props.onDeleteItem(id)
  }

  // 添加日报（发布按钮点击）
  onAppend = () => {
    this.props.onAppend &&
    this.props.onAppend({
      record: this.state.record,
      progress: this.state.progress,
      project: this.state.project,
    })
  }

  // 清除内容
  clear = () => {
    this.setState({
      record: '',
      progress: 0,
      project: '',
    })
  }

  // 进度编辑
  progressChange = e => {
    this.setState({
      progress: e.target.value
    })
  }

  render() {
    return (
      <div className="my-daily-writer">
        {this.renderMyDailyList()}
        {this.renderWriter()}
      </div>
    )
  }
}

export default MyDailyWriter