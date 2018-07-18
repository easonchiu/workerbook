import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Wrapper from 'src/containers/wrapper'
import ProjectItem from 'src/components/projectItem'
import MissionItem from 'src/components/missionItem'
import AsideDialog from 'src/containers/asideDialog'
import IconClose from 'src/components/svg/close'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showMission: true
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

        <AsideDialog className="view-project__mission-bar" visible={this.state.showMission}>
          <div className="inner">
            <header className="header">
              <h2><span className="weight-2">重要</span>世界杯活动页面开发</h2>
              <IconClose.A
                onClick={() => {
                  this.setState({
                    showMission: false
                  })
                }}
              />
            </header>
            <MissionItem showJoined />
            <MissionItem showJoined />
            <MissionItem showJoined />
            <MissionItem showJoined />
            <MissionItem showJoined />
          </div>
        </AsideDialog>

      </div>
    )
  }
}
