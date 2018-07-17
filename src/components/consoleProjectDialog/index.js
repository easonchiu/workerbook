import './style'
import React from 'react'
import ignore from 'src/utils/ignore'
import classNames from 'classnames'

import Err from 'src/utils/errif'
import Button from 'src/components/button'
import Input from 'src/components/input'
import Select from 'src/components/select'
import Form from 'src/containers/form'
import MainDialog from 'src/containers/mainDialog'

class ConsoleProjectDialog extends React.PureComponent {
  constructor(props) {
    super(props)
    this.nilForm = {
      name: '',
      deadline: '',
      departments: [],
      description: '',
      weight: 1,
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

  onFormDepartmentChange = e => {
    let newDepartments = []
    let index = this.state.departments.indexOf(e)
    if (index !== -1) {
      let d = [...this.state.departments]
      d.splice(index, 1)
      newDepartments = d
    }
    else {
      newDepartments = [...this.state.departments, e]
    }
    this.setState({
      departments: newDepartments
    })
  }

  onWeightChange = e => {
    this.setState({
      weight: e
    })
  }

  onFormSubmit = () => {
    Err.IfEmpty(this.state.name, '项目名称不能为空')
    Err.IfEmpty(this.state.deadline, '截至时间不能为空')
    Err.IfEmptyArr(this.state.departments, '参与部门不能为空')

    if (!Err.Handle()) {
      this.props.onSubmit && this.props.onSubmit(ignore(this.state, 'id'))
    }
  }

  onFormEditSubmit = () => {
    Err.IfEmpty(this.state.name, '项目名称不能为空')
    Err.IfEmpty(this.state.deadline, '截至时间不能为空')
    Err.IfEmptyArr(this.state.departments, '参与部门不能为空')

    if (!Err.Handle()) {
      this.props.onEditSubmit && this.props.onEditSubmit(this.state)
    }
  }

  renderDialog() {
    const select = this.props.departments || []
    return (
      <MainDialog
        className="dialog-console-project"
        title={this.state.id ? '修改项目' : '添加项目'}
        visible={this.props.visible}
        onClose={this.props.onClose}
      >
        <Form>
          <Form.Row label="项目名称">
            <Input
              name="name"
              value={this.state.name}
              onChange={this.onFormChange}
            />
          </Form.Row>

          <Form.Row label="截至时间">
            <Input
              name="deadline"
              value={this.state.deadline}
              onChange={this.onFormChange}
            />
          </Form.Row>

          <Form.Row label="权重">
            <ul className="weight">
              <li
                onClick={this.onWeightChange.bind(this, 1)}
                className={classNames('weight-1', { active: this.state.weight === 1 })}
              >
                <span />一般
              </li>
              <li
                onClick={this.onWeightChange.bind(this, 2)}
                className={classNames('weight-2', { active: this.state.weight === 2 })}
              >
                <span />重要
              </li>
              <li
                onClick={this.onWeightChange.bind(this, 3)}
                className={classNames('weight-3', { active: this.state.weight === 3 })}
              >
                <span />紧急
              </li>
            </ul>
          </Form.Row>

          <Form.Row label="参与部门">
            <Select
              multi
              value={this.state.departments}
              onClick={this.onFormDepartmentChange}
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

          <Form.Row label="说明">
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

export default ConsoleProjectDialog