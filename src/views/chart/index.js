import './style'
import React, { PureComponent } from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Wrapper from 'src/containers/wrapper'

@VIEW
@ComponentEvent('evt', Event)
export default class View extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    this.evt.fetchData()
  }

  render(props, state) {
    const profile = this.props.user$.profile

    return (
      <div className="view-chart">
        <Wrapper.Header nav="chart" profile={profile} />

        <Wrapper.Body>

        </Wrapper.Body>

        <Wrapper.Footer />

      </div>
    )
  }
}
