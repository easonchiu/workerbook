import './style'
import React from 'react'
import ignore from 'src/utils/ignore'

import Toast from 'src/components/toast'
import Err from 'src/utils/errif'
import Button from 'src/components/button'
import Input from 'src/components/input'
import DayPicker from 'src/components/dayPicker'
import Form from 'src/containers/form'
import MainDialog from 'src/containers/mainDialog'
import Select from 'src/components/select'

class AssignMissionDialog extends React.PureComponent {
  constructor(props) {
    super(props)
    this.nilForm = {
      name: '',
      userId: '',
      deadline: new Date(),
      id: '',
    }
    this.state = {
      ...this.nilForm,
      projectDeadline: new Date()
    }
  }

  $clear() {
    this.setState({
      ...this.nilForm
    })
  }

  $project(data) {
    this.projectId = data.id
    if (data.deadline) {
      if (typeof data.deadline === 'string') {
        data.deadline = new Date(data.deadline)
      }
      this.setState({
        projectDeadline: data.deadline || new Date()
      })
    }
  }

  $fill(data = {}) {
    const d = {}
    Object.keys(this.nilForm).forEach(i => {
      if (typeof data[i] !== 'undefined') {
        d[i] = data[i]
      }
    })
    this.setState({
      ...d
    })
  }

  // 表单字段修改
  onFormChange = e => {
    const key = e.target.name
    this.setState({
      [key]: e.target.value
    })
  }

  // 日期修改
  onDeadlineChange = e => {
    this.setState({
      deadline: e
    })
  }

  // 执行人修改
  onUserChange = e => {
    this.setState({
      userId: e
    })
  }

  onFormSubmit = () => {
    if (!this.projectId) {
      Toast.error('找不到相关的项目')
      return
    }
    Err.IfEmpty(this.state.name, '任务名称不能为空')
    Err.IfEmpty(this.state.userId, '执行人不能为空')

    if (!Err.Handle()) {
      this.props.onSubmit && this.props.onSubmit(ignore({
        ...this.state,
        projectId: this.projectId,
      }, 'id projectDeadline'))
    }
  }

  onFormEditSubmit = () => {
    if (!this.projectId) {
      Toast.error('找不到相关的项目')
      return
    }
    Err.IfEmpty(this.state.name, '任务名称不能为空')
    Err.IfEmpty(this.state.userId, '执行人不能为空')

    if (!Err.Handle()) {
      this.props.onEditSubmit && this.props.onEditSubmit(ignore({
        ...this.state,
      }, 'projectDeadline'))
    }
  }

  renderDialog() {
    const select = this.props.users || []
    return (
      <MainDialog
        className="wb-dialog-assign-mission"
        title={this.state.id ? '修改任务' : '添加任务'}
        visible={this.props.visible}
        onClose={this.props.onClose}
      >
        <Form>
          <Form.Row label="任务名称">
            <Input
              name="name"
              value={this.state.name}
              onChange={this.onFormChange}
            />
          </Form.Row>

          <Form.Row label="执行人">
            <Select
              value={this.state.userId}
              onClick={this.onUserChange}
            >
              {
                select.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.nickname}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Row>

          <Form.Row label="截止时间">
            <DayPicker
              end={this.state.projectDeadline}
              value={this.state.deadline}
              onChange={this.onDeadlineChange}
            />
          </Form.Row>

          <Form.Row>
            {
              this.state.id ?
                <Button onClick={this.onFormEditSubmit}>
                  修改
                </Button> :
                <Button onClick={this.onFormSubmit}>
                  提交
                </Button>
            }
          </Form.Row>
        </Form>
      </MainDialog>
    )
  }

  // 键盘控制
  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (this.state.id) {
        this.onFormEditSubmit()
      }
      else {
        this.onFormSubmit()
      }
    }
    else if (e.keyCode === 27) {
      this.props.onClose && this.props.onClose()
    }
  }

  render() {
    // 添加或移除键盘事件
    if (this.props.visible) {
      if (!this.$listener) {
        window.addEventListener('keydown', this.onKeyDown)
        this.$listener = true
      }
    }
    else if (this.$listener) {
      this.$listener = false
      window.removeEventListener('keydown', this.onKeyDown)
    }
    return this.renderDialog()
  }
}

export default AssignMissionDialog