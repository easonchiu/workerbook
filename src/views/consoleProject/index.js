import './style'
import React from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Button from 'src/components/button'
import Pager from 'src/components/pager'
import ConsoleProjectDialog from 'src/components/consoleProjectDialog'
import ConsoleDeleteDialog from 'src/components/consoleDeleteDialog'
import IconRewrite from 'src/components/svg/rewrite'
import IconDelete from 'src/components/svg/delete'
import Progress from 'src/components/progress'

@VIEW
@ComponentEvent('evt', Event)
class ConsoleProject extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      projectDialogVisible: false,
      delProjectDialogVisible: false,
      delProjectDialogData: null,
    }
  }

  componentDidMount() {
    const p = this.search.page || 1
    this.evt.fetchData(p)
  }

  renderProjectDialog() {
    const { c_select: select } = this.props.department$
    return (
      <ConsoleProjectDialog
        ref={r => { this.projectDialog = r }}
        departments={select ? select.list || [] : []}
        visible={this.state.projectDialogVisible}
        onClose={this.evt.onCloseProjectDialog}
        onSubmit={this.evt.onAddProjectSubmit}
        onEditSubmit={this.evt.onEditProjectSubmit}
      />
    )
  }

  renderDelProjectDialog() {
    const data = this.state.delProjectDialogData || {}
    return (
      <ConsoleDeleteDialog
        type="项目"
        name={data.name}
        visible={this.state.delProjectDialogVisible}
        onClose={this.evt.onCloseDelProjectDialog}
        onDelete={this.evt.onDelProjectSubmit.bind(this, data)}
      />
    )
  }

  render() {
    const { c_projects: projects } = this.props.project$
    const header = (
      <tr>
        <td>编号</td>
        <td>名称</td>
        <td>任务数</td>
        <td>进度</td>
        <td>截止时间</td>
        <td>创建时间</td>
        <td>操作</td>
      </tr>
    )
    const body = projects.list.map((res, i) => (
      <tr key={res.id}>
        <td>{projects.skip + i + 1}</td>
        <td>
          {
            res.weight === 2 ?
              <span className="weight-2">重要</span> :
              res.weight === 3 ?
                <span className="weight-3">紧急</span> :
                null
          }
          {res.name}
        </td>
        <td>{res.missions ? res.missions.length : '-'}</td>
        <td>
          <Progress value={res.progress} width={80} />
        </td>
        <td>{new Date(res.deadline).format('yyyy-MM-dd hh_mm_ss')}</td>
        <td>{new Date(res.createTime).format('yyyy-MM-dd hh:mm')}</td>
        <td className="c">
          <IconRewrite.A
            tips="编辑"
            onClick={() => this.evt.onEditProjectClick(res)}
          />
          <IconDelete.A
            tips="删除"
            onClick={() => this.evt.onDelProjectClick(res)}
          />
          <Button mini>归档</Button>
        </td>
      </tr>
    ))
    return (
      <div className="console-project">
        <header className="console-header">
          <h1>项目管理</h1>
          <Button onClick={this.evt.onAddProjectClick}>添加</Button>
        </header>
        <table className="console-table">
          <thead>{header}</thead>
          <tbody>{body}</tbody>
        </table>
        <Pager
          current={projects.skip / projects.limit + 1}
          max={Math.ceil(projects.count / projects.limit)}
          onClick={this.evt.onPageClick}
        />
        {this.renderProjectDialog()}
        {this.renderDelProjectDialog()}
      </div>
    )
  }
}

export default ConsoleProject