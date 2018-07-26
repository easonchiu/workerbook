import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import ProjectItem from 'src/components/projectItem'
import MissionDetailDialog from 'src/components/missionDetailDialog'
import AssignMissionDialog from 'src/components/assignMissionDialog'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      missionDetailDialogVisible: false,
      missionDetailDialogDate: null,

      assignMissionDialogVisible: false,
    }
  }

  componentDidMount() {
    this.evt.fetchData()
  }

  renderAssignMissionDialog() {
    const { subList: users } = this.props.user$
    return (
      <AssignMissionDialog
        ref={r => { this.assignMissionDialog = r }}
        visible={this.state.assignMissionDialogVisible}
        users={users}
        onClose={this.evt.onCloseAssignMissionDialog}
        onSubmit={this.evt.onAssignMissionSubmit}
        onEditSubmit={this.evt.onEditAssignMissionSubmit}
      />
    )
  }

  render(props, state) {
    const { profile } = props.user$
    const { projects } = props.project$
    return (
      <div className="view-project">

        <div className="project-list">
          <header>
            <h1>参与中的</h1>
          </header>
          <div className="list clearfix">
            {
              projects.map(item => (
                <ProjectItem
                  key={item.id}
                  source={item}
                  userId={profile.id}
                  onAddAssignMissionClick={this.evt.onAddAssignMissionClick}
                  onMissionClick={this.evt.onMissionClick}
                />
              ))
            }
          </div>
        </div>

        <MissionDetailDialog
          source={state.missionDetailDialogDate}
          visible={state.missionDetailDialogVisible}
          onEditClick={this.evt.onEditAssignMissionClick}
          onCloseClick={this.evt.onCloseMissionDetailDialog}
        />

        {this.renderAssignMissionDialog()}

      </div>
    )
  }
}
