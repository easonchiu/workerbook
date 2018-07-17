import './style'
import React from 'react'
import Dialog from 'src/containers/dialog'
import classNames from 'classnames'

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
    const d = 'M505.173333 416.426666 122.88 27.306666c-27.306667-27.306667-68.266667-27.306667-102.4 0l0 0c-27.306667 27.306667-27.306667 68.266667 0 102.4L409.6 512l-389.12 389.12c-27.306667 27.306667-27.306667 68.266667 0 102.4l0 0c27.306667 27.306667 68.266667 27.306667 102.4 0l389.12-389.12 389.12 389.12c27.306667 27.306667 68.266667 27.306667 102.4 0l0 0c27.306667-27.306667 27.306667-68.266667 0-102.4L607.573333 512l389.12-389.12c27.306667-27.306667 27.306667-68.266667 0-102.4l0 0c-27.306667-27.306667-68.266667-27.306667-102.4 0L505.173333 416.426666 505.173333 416.426666z'
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
            <a href="javascript:;" onClick={this.props.onClose}>
              <svg width="128" height="128" viewBox="0 0 1024 1024">
                <path d={d} />
              </svg>
            </a>
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