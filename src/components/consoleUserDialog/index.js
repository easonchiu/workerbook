import './style'
import React from 'react'
import ignore from 'src/utils/ignore'

import Err from 'src/utils/errif'
import Button from 'src/components/button'
import Input from 'src/components/input'
import Select from 'src/components/select'
import Form from 'src/containers/form'
import MainDialog from 'src/containers/mainDialog'

class ConsoleUserDialog extends React.PureComponent {
  constructor(props) {
    super(props)
    this.nilForm = {
      username: '',
      password: '',
      nickname: '',
      departmentId: '',
      title: '',
      role: '',
      status: '',
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

  onDepartmentsChange = e => {
    this.setState({
      departmentId: e
    })
  }

  onRoleChange = e => {
    this.setState({
      role: e
    })
  }

  onStatusChange = e => {
    this.setState({
      status: e
    })
  }

  onFormSubmit = () => {
    Err.IfEmpty(this.state.username, '登录帐号不能为空')
    Err.IfEmpty(this.state.password, '初始密码不能为空')
    Err.IfEmpty(this.state.nickname, '姓名不能为空')
    Err.IfEmpty(this.state.departmentId, '请选择部门')
    Err.IfEmpty(this.state.title, '职称不能为空')
    Err.IfEmpty(this.state.role, '请选择职位')

    if (!Err.Handle()) {
      this.props.onSubmit && this.props.onSubmit(ignore(this.state, 'id'))
    }
  }

  onFormEditSubmit = () => {
    Err.IfEmpty(this.state.nickname, '姓名不能为空')
    Err.IfEmpty(this.state.departmentId, '请选择部门')
    Err.IfEmpty(this.state.title, '职称不能为空')
    Err.IfEmpty(this.state.role, '请选择职位')

    if (!Err.Handle()) {
      this.props.onEditSubmit && this.props.onEditSubmit(this.state)
    }
  }

  renderDialog() {
    const select = this.props.departments || []
    return (
      <MainDialog
        className="dialog-console-user"
        title={this.state.id ? '修改人员' : '添加人员'}
        visible={this.props.visible}
        onClose={this.props.onClose}
      >
        {
          !this.state.id ?
            <Form>
              <Form.Row label="帐号">
                <Input
                  name="username"
                  value={this.state.username}
                  onChange={this.onFormChange}
                />
              </Form.Row>
              <Form.Row label="初始密码">
                <Input
                  name="password"
                  value={this.state.password}
                  onChange={this.onFormChange}
                />
              </Form.Row>
            </Form> :
            null
        }

        <Form>
          <Form.Row label="姓名">
            <Input
              name="nickname"
              value={this.state.nickname}
              onChange={this.onFormChange}
            />
          </Form.Row>

          <Form.Row label="部门">
            <Select
              value={this.state.departmentId}
              onClick={this.onDepartmentsChange}
            >
              {
                select.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Row>

          <Form.Row label="职称">
            <Input
              name="title"
              value={this.state.title}
              onChange={this.onFormChange}
            />
          </Form.Row>

          <Form.Row label="职位">
            <Select
              value={this.state.role}
              onClick={this.onRoleChange}
            >
              <Select.Option value={1}>开发者</Select.Option>
              <Select.Option value={2}>部门管理者</Select.Option>
              <Select.Option value={3}>观察者</Select.Option>
            </Select>
          </Form.Row>

          {
            this.state.id ?
              <Form.Row label="状态">
                <Select
                  value={this.state.status}
                  onClick={this.onStatusChange}
                >
                  <Select.Option value={1}>正常</Select.Option>
                  <Select.Option value={2}>停用</Select.Option>
                </Select>
              </Form.Row> :
              null
          }

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

export default ConsoleUserDialog