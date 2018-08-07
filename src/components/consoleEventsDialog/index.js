import './style'
import React from 'react'
import ignore from 'src/utils/ignore'

import Err from 'src/utils/errif'
import Button from 'src/components/button'
import Input from 'src/components/input'
import Form from 'src/containers/form'
import MainDialog from 'src/containers/mainDialog'

class ConsoleEventsDialog extends React.PureComponent {
  constructor(props) {
    super(props)
    this.nilForm = {
      name: '',
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
    Err.IfEmpty(this.state.name, '名称不能为空')

    if (!Err.Handle()) {
      this.props.onSubmit && this.props.onSubmit(ignore(this.state, 'id'))
    }
  }

  renderDialog() {
    return (
      <MainDialog
        className="dialog-console-department"
        title="添加日常"
        visible={this.props.visible}
        onClose={this.props.onClose}
      >
        <Form>
          <Form.Row label="名称">
            <Input
              name="name"
              value={this.state.name}
              onChange={this.onFormChange}
            />
          </Form.Row>
          <Form.Row>
            <Button onClick={this.onFormSubmit}>
              提交
            </Button>
          </Form.Row>
        </Form>
      </MainDialog>
    )
  }

  render() {
    return this.renderDialog()
  }
}

export default ConsoleEventsDialog