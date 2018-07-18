import './style'
import React from 'react'
import Dialog from 'src/containers/dialog'
import classNames from 'classnames'

import IconClose from 'src/components/svg/close'

class MainDialog extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    if (props.visible) {
      setTimeout(() => {
        this.setState({
          visible: true
        })
      })
    }
  }

  onStatusChange = status => {
    this.setState({
      visible: status
    })
  }

  render() {
    const innerCss = classNames('main-dialog__content', {
      'main-dialog--in': this.state.visible,
      'main-dialog--out': !this.state.visible
    })

    return (
      <Dialog
        visible={this.props.visible}
        className={this.props.className}
        onStatusChange={this.onStatusChange}
        onBgClick={this.props.onClose}
      >
        <div className={innerCss}>
          <header className="main-dialog__header">
            <h1>{this.props.title}</h1>
            <IconClose.A onClick={this.props.onClose} />
          </header>
          <div className="main-dialog__body">
            {this.props.children}
          </div>
        </div>
      </Dialog>
    )
  }
}

export default MainDialog