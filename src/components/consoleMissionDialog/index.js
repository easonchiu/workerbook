import './style'
import React from 'react'
import ignore from 'src/utils/ignore'

import Toast from 'src/components/toast'
import Err from 'src/utils/errif'
import Button from 'src/components/button'
import Input from 'src/components/input'
import Form from 'src/containers/form'
import MainDialog from 'src/containers/mainDialog'

class ConsoleMissionDialog extends React.PureComponent {
  constructor(props) {
    super(props)
    this.nilForm = {
      name: '',
      description: '',
      deadline: '',
      id: '',
    }
    this.state = {
      ...this.nilForm
    }
  }

  $clear() {
    this.setState({
      ...this.nilForm
    })
  }

  $projectId(id) {
    this.projectId = id
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

  onFormSubmit = () => {
    if (!this.projectId) {
      Toast.error('找不到相关的项目')
      return
    }
    Err.IfEmpty(this.state.name, '任务名称不能为空')

    if (!Err.Handle()) {
      this.props.onSubmit && this.props.onSubmit(ignore({
        ...this.state,
        projectId: this.projectId,
      }, 'id'))
    }
  }

  onFormEditSubmit = () => {
    if (!this.projectId) {
      Toast.error('找不到相关的项目')
      return
    }
    Err.IfEmpty(this.state.name, '任务名称不能为空')

    if (!Err.Handle()) {
      this.props.onEditSubmit && this.props.onEditSubmit({
        ...this.state,
        projectId: this.projectId,
      })
    }
  }

  renderDialog() {
    return (
      <MainDialog
        className="dialog-console-mission"
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
          <Form.Row label="截至时间">
            <input
              type="time"
              name="deadline"
              value={this.state.deadline}
              onChange={this.onFormChange}
            />
          </Form.Row>
          <Form.Row label="任务说明">
            <Input
              name="description"
              value={this.state.description}
              onChange={this.onFormChange}
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

  render() {
    return this.renderDialog()
  }
}

export default ConsoleMissionDialog