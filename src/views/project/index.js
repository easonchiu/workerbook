import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Wrapper from 'src/containers/wrapper'
import ProjectItem from 'src/components/projectItem'
import AssignMissionDialog from 'src/components/assignMissionDialog'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      assignMissionDialogVisible: true
    }
  }

  componentDidMount() {
    this.evt.fetchData()
  }

  render(props, state) {
    const { profile } = this.props.user$
    const { projects } = this.props.project$

    return (
      <div className="view-project">
        <Wrapper.Header nav="project" profile={profile} />

        <Wrapper.Body>

          <div className="project-list">
            <header>
              <h1>参与中的</h1>
            </header>
            <div className="list">
              {
                projects.map(item => (
                  <ProjectItem
                    key={item.id}
                    source={item}
                    onAssignClick={this.evt.click}
                  />
                ))
              }
            </div>
          </div>

        </Wrapper.Body>

        <Wrapper.Footer />

        <AssignMissionDialog
          visible={this.state.assignMissionDialogVisible}
          onCloseClick={this.evt.hide}
        />

      </div>
    )
  }
}
