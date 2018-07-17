import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Wrapper from 'src/containers/wrapper'
import ProjectItem from 'src/components/projectItem'
import MissionItem from 'src/components/missionItem'
import AsideDialog from 'src/containers/asideDialog'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showMission: false
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
                    onMissionClick={this.evt.click}
                  />
                ))
              }
            </div>
          </div>

        </Wrapper.Body>

        <Wrapper.Footer />

        <AsideDialog className="view-project__mission-bar" visible={this.state.showMission}>
          <div className="inner">
            <a
              onClick={() => {
                this.setState({
                  showMission: false
                })
              }}
            >
              xxx
            </a>
            <header><h2>世界杯活动页面开发</h2></header>
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
