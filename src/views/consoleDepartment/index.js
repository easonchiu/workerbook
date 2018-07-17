import './style'
import React from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Button from 'src/components/button'
import Pager from 'src/components/pager'
import ConsoleDepartmentDialog from 'src/components/consoleDepartmentDialog'
import ConsoleDeleteDialog from 'src/components/consoleDeleteDialog'
import IconRewrite from 'src/components/svg/rewrite'
import IconDelete from 'src/components/svg/delete'

@VIEW
@ComponentEvent('evt', Event)
class ConsoleDepartment extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      departmentDialogVisible: false,
      delDepartmentDialogVisible: false,
      delDepartmentDialogData: null,
    }
  }

  componentDidMount() {
    this.evt.fetchData()
  }

  renderDepartmentDialog() {
    return (
      <ConsoleDepartmentDialog
        ref={r => { this.departmentDialog = r }}
        visible={this.state.departmentDialogVisible}
        onClose={this.evt.onCloseDepartmentDialog}
        onSubmit={this.evt.onAddDepartmentSubmit}
        onEditSubmit={this.evt.onEditDepartmentSubmit}
      />
    )
  }

  // 删除部门弹层
  renderDelDepartmentDialog() {
    const data = this.state.delDepartmentDialogData || {}
    return (
      <ConsoleDeleteDialog
        type="部门"
        name={data.name}
        visible={this.state.delDepartmentDialogVisible}
        onClose={this.evt.onCloseDelDepartmentDialog}
        onDelete={this.evt.onDelDepartmentSubmit.bind(this, data)}
      />
    )
  }

  render() {
    const { c_departments: departments } = this.props.department$
    const header = (
      <tr>
        <td>编号</td>
        <td>部门名称</td>
        <td>人数</td>
        <td>创建时间</td>
        <td>操作</td>
      </tr>
    )
    const body = departments.list.map((res, i) => (
      <tr key={res.id}>
        <td>{departments.skip + i + 1}</td>
        <td>{res.name}</td>
        <td>{res.userCount}</td>
        <td>{new Date(res.createTime).format('yyyy-MM-dd hh:mm')}</td>
        <td className="c">
          <IconRewrite.A
            onClick={() => this.evt.onEditDepartmentClick(res)}
          />
          <IconDelete.A
            onClick={() => this.evt.onDelDepartmentClick(res)}
          />
        </td>
      </tr>
    ))
    return (
      <div className="console-department">
        <header>
          <h1>部门管理</h1>
          <Button onClick={this.evt.onAddDepartmentClick}>添加</Button>
        </header>
        <table className="console-table">
          <thead>{header}</thead>
          <tbody>{body}</tbody>
        </table>
        <Pager
          current={departments.skip / departments.limit + 1}
          max={Math.ceil(departments.count / departments.limit)}
          onClick={this.evt.onPageClick}
        />
        {this.renderDepartmentDialog()}
        {this.renderDelDepartmentDialog()}
      </div>
    )
  }
}

export default ConsoleDepartment