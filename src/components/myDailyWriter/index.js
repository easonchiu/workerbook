import './style'
import React, { PureComponent } from 'react'

import Input from 'src/components/input'
import Button from 'src/components/button'
import Select from 'src/components/select'

class MyDailyWriter extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      record: '',
      progress: 15,
      project: '',
    }
  }

  // 日报编写区 - 我已经写的日报
  renderMyDailyList() {
    // const list = this.props.myDailyList
    return (
      <div className="daily-list">
        <div className="item">
          <div className="mission clearfix">
            <span />
            <strong>社区4.0 前端页面开发</strong>
          </div>
          <p>配合测试, 上传合同接口增加接收字段,车辆修改记录接口增加返回字段</p>
          <p>配合测试, 修改车辆状态增加操作日志记录(补7月24日)</p>
        </div>

        <div className="item">
          <div className="mission clearfix">
            <span />
            <strong>社区4.0 前端页面开发</strong>
          </div>
          <p>配合测试, 上传合同接口增加接收字段,车辆修改记录接口增加返回字段</p>
        </div>

      </div>
    )
  }

  // 日报编写区 - 新建日报面板
  renderWriter() {
    // const list = this.props.projectList
    const progress = '5_10_15_20_25_30_35_40_45_50_55_60_65_70_75_80_85_90_95_100'

    return (
      <div className="writer-box">
        <Input
          multi={true}
          className="writer-input"
          placeholder="请输入日报内容"
          value={this.state.record}
          onChange={this.dailyWriterChange}
        />

        <div className="tools clearfix">
          <Select
            value={this.state.project}
            onChange={this.dailyProjectChange}
            className="missions"
            placeholder="请选择任务"
          >
            <Select.Option value={1}>xxx</Select.Option>
            <Select.Option value={2}>xxx</Select.Option>
            <Select.Option value={3}>xxx</Select.Option>
            <Select.Option value={4}>xxx</Select.Option>
            <Select.Option value={5}>xxx</Select.Option>
            <Select.Option value={6}>xxx</Select.Option>
          </Select>

          <Select
            value={this.state.progress}
            onClick={this.progressChange}
            className="progress"
            placeholder="任务进度"
          >
            {
              progress.split('_').map(i => (
                <Select.Option
                  key={i}
                  value={i - 0}
                  text={<p><span>任务进度</span>{i}%</p>}
                >
                  {i}
                </Select.Option>
              ))
            }
          </Select>

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
      progress: e
    })
  }

  render() {
    return (
      <div className="wb-daily-writer">
        <div className="icon" />
        {this.renderMyDailyList()}
        {this.renderWriter()}
      </div>
    )
  }
}

export default MyDailyWriter