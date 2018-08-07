import Toast from 'src/components/toast'
import fetcher from 'src/utils/fetcher'

export default class Event {
  fetchData = async (pager = 1) => {
    await fetcher.one(this.props.$events.c_fetchList, {
      skip: pager * 5 - 5,
      limit: 5,
    })
  }

  // 翻页
  onPageClick = p => {
    this.fetchData(p)
    this.props.history.push('?page=' + p)
  }

  // 新增日常提交
  onAddEventsSubmit = async data => {
    await fetcher.one(this.props.$events.c_create, data)
    this.onCloseEventsDialog()
    await this.fetchData()
    Toast.success('添加成功')
  }

  // 添加按钮点击
  onAddEventsClick = () => {
    this.eventsDialog && this.eventsDialog.$clear()
    this.onOpenEventsDialog()
  }

  // 删除按钮点击
  onDelEventsClick = data => {
    this.setState({
      delEventsDialogVisible: true,
      delEventsDialogData: data,
    })
  }

  // 打开弹层
  onOpenEventsDialog = () => {
    this.setState({
      eventsDialogVisible: true
    })
  }

  // 关闭删除弹层
  onCloseDelEventsDialog = () => {
    this.setState({
      delEventsDialogVisible: false
    })
  }

  // 确定删除日常
  onDelEventsSubmit = async data => {
    if (data && data.id) {
      await fetcher.one(this.props.$events.c_del, data.id)
      await this.fetchData()
      this.onCloseDelEventsDialog()
      Toast.success('删除成功')
    }
    else {
      Toast.error('系统错误')
    }
  }

  // 关闭弹层
  onCloseEventsDialog = () => {
    this.setState({
      eventsDialogVisible: false
    })
  }

}