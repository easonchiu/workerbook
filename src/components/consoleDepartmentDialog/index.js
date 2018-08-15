import './style'
import React from 'react'
import ignore from 'src/utils/ignore'

import Err from 'src/utils/errif'
import Button from 'src/components/button'
import Input from 'src/components/input'
import Form from 'src/containers/form'
import MainDialog from 'src/containers/mainDialog'

class ConsoleDepartmentDialog extends React.PureComponent {
  constructor(props) {
    super(props)
    this.nilForm = {
      name: '',
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
    Err.IfEmpty(this.state.name, '部门名称不能为空')

    if (!Err.Handle()) {
      this.props.onSubmit && this.props.onSubmit(ignore(this.state, 'id'))
    }
  }

  onFormEditSubmit = () => {
    Err.IfEmpty(this.state.name, '部门名称不能为空')

    if (!Err.Handle()) {
      this.props.onEditSubmit && this.props.onEditSubmit(this.state)
    }
  }

  renderDialog() {
    return (
      <MainDialog
        className="dialog-console-department"
        title={this.state.id ? '修改部门' : '添加部门'}
        visible={this.props.visible}
        onClose={this.props.onClose}
      >
        <Form>
          <Form.Row label="部门名称">
            <Input
              name="name"
              value={this.state.name}
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

export default ConsoleDepartmentDialog