import './style'
import React from 'react'
import VIEW from 'src/hoc/view'
import ComponentEvent from 'src/hoc/componentEvent'
import Event from './event'

import Button from 'src/components/button'
import Pager from 'src/components/pager'
import ConsoleEventsDialog from 'src/components/consoleEventsDialog'
import ConsoleDeleteDialog from 'src/components/consoleDeleteDialog'
import IconDelete from 'src/components/svg/delete'

@VIEW
@ComponentEvent('evt', Event)
class ConsoleEvents extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      eventsDialogVisible: false,
      delEventsDialogVisible: false,
      delEventsDialogData: null,
    }
  }

  componentDidMount() {
    const p = this.search.page || 1
    this.evt.fetchData(p)
  }

  renderEventsDialog() {
    return (
      <ConsoleEventsDialog
        ref={r => { this.eventsDialog = r }}
        visible={this.state.eventsDialogVisible}
        onClose={this.evt.onCloseEventsDialog}
        onSubmit={this.evt.onAddEventsSubmit}
      />
    )
  }

  // 删除日常弹层
  renderDelEventsDialog() {
    const data = this.state.delEventsDialogData || {}
    return (
      <ConsoleDeleteDialog
        type="日常"
        name={data.name}
        visible={this.state.delEventsDialogVisible}
        onClose={this.evt.onCloseDelEventsDialog}
        onDelete={this.evt.onDelEventsSubmit.bind(this, data)}
      />
    )
  }

  render() {
    const { c_events: events } = this.props.events$
    const header = (
      <tr>
        <td>编号</td>
        <td>名称</td>
        <td>创建时间</td>
        <td>操作</td>
      </tr>
    )
    const body = events.list.map((res, i) => (
      <tr key={res.id}>
        <td>{events.skip + i + 1}</td>
        <td>{res.name}</td>
        <td>{new Date(res.createTime).format('yyyy-MM-dd hh:mm')}</td>
        <td className="c">
          <IconDelete.A
            tips="删除"
            onClick={() => this.evt.onDelEventsClick(res)}
          />
        </td>
      </tr>
    ))
    return (
      <div className="console-events">
        <header className="console-header">
          <h1>日常管理</h1>
          <Button onClick={this.evt.onAddEventsClick}>添加</Button>
        </header>
        <table className="console-table">
          <thead>{header}</thead>
          <tbody>{body}</tbody>
        </table>
        <Pager
          current={events.skip / events.limit + 1}
          max={Math.ceil(events.count / events.limit)}
          onClick={this.evt.onPageClick}
        />
        {this.renderEventsDialog()}
        {this.renderDelEventsDialog()}
      </div>
    )
  }
}

export default ConsoleEvents