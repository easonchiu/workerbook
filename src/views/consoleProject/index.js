import './style'
import React from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Button from 'src/components/button'
import ProjectItem from 'src/components/consoleProjectItem'
import Pager from 'src/components/pager'
import ConsoleProjectDialog from 'src/components/consoleProjectDialog'
import ConsoleMissionDialog from 'src/components/consoleMissionDialog'
import ConsoleDeleteDialog from 'src/components/consoleDeleteDialog'

@VIEW
@ComponentEvent('evt', Event)
class ConsoleProject extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      projectDialogVisible: false,
      delProjectDialogVisible: false,
      delProjectDialogData: null,

      missionDialogVisible: false,
    }
  }

  componentDidMount() {
    this.evt.fetchData()
    this.evt.fetchDepartments()
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

  renderMissionDialog() {
    return (
      <ConsoleMissionDialog
        ref={r => { this.missionDialog = r }}
        visible={this.state.missionDialogVisible}
        onClose={this.evt.onCloseMissionDialog}
        onSubmit={this.evt.onAddMissionSubmit}
        onEditSubmit={this.evt.onEditMissionSubmit}
      />
    )
  }

  render() {
    const { c_projects: projects } = this.props.project$
    const row = []
    for (let i = 0; i < projects.list.length; i += 4) {
      row.push(
        <div className="console-row" key={i}>
          {
            [0, 1, 2, 3].map(j => {
              const item = projects.list[i + j]
              if (item) {
                return (
                  <ProjectItem
                    key={j}
                    onAddMissionClick={this.evt.onAddMissionClick}
                    onEditMissionClick={this.evt.onEditMissionClick}
                    onDelMissionClick={this.evt.onDelMissionClick}
                    onEditProjectClick={this.evt.onEditProjectClick}
                    onDelProjectClick={this.evt.onDelProjectClick}
                    source={item}
                  />
                )
              }
              return <div className="space" key={j} />
            })
          }
        </div>
      )
    }
    return (
      <div className="console-project">
        <header className="console-header">
          <h1>项目管理</h1>
          <Button onClick={this.evt.onAddProjectClick}>添加</Button>
        </header>
        <div className="console-list">
          {row}
        </div>
        <Pager
          current={projects.skip / projects.limit + 1}
          max={Math.ceil(projects.count / projects.limit)}
          onClick={this.evt.onPageClick}
        />
        {this.renderProjectDialog()}
        {this.renderDelProjectDialog()}
        {this.renderMissionDialog()}
      </div>
    )
  }
}

export default ConsoleProject