import './style'
import React from 'react'
import MainDialog from 'src/containers/mainDialog'
import Button from 'src/components/button'

class ConsoleDeleteDialog extends React.PureComponent {
  // 键盘控制
  onKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.onClose && this.props.onClose()
      this.$listener = false
      window.removeEventListener('keydown', this.onKeyDown)
    }
  }

  render() {
    // 添加或移除键盘事件
    if (this.props.visible && !this.$listener) {
      window.addEventListener('keydown', this.onKeyDown)
      this.$listener = true
    }

    const props = this.props
    return (
      <MainDialog
        title={'删除' + props.type}
        visible={props.visible}
        onClose={props.onClose}
        className="dialog-console-del"
      >
        <p>
          确定要删除{props.type}<span>{props.name}</span>吗？该操作不可逆
        </p>
        <div className="btn">
          <Button danger onClick={props.onDelete}>
            删除{props.type}
          </Button>
          <Button onClick={props.onClose}>
            取消
          </Button>
        </div>
      </MainDialog>
    )
  }
}

export default ConsoleDeleteDialog