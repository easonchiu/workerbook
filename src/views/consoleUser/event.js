import Toast from 'src/components/toast'
import fetcher from 'src/utils/fetcher'

export default class Event {
  fetchData = async (pager = 1) => {
    await fetcher.one(this.props.$user.c_fetchList, {
      skip: pager * 30 - 30,
      limit: 30,
    })
  }

  // 翻页
  onPageClick = pager => {
    this.fetchData(pager)
  }

  // 新增人员提交
  onAddUserSubmit = async data => {
    await fetcher.one(this.props.$user.c_create, data)
    this.onCloseUserDialog()
    await this.fetchData()
    Toast.success('添加成功')
  }

  // 修改人员提交
  onEditUserSubmit = async data => {
    await fetcher.one(this.props.$user.c_update, data)
    this.onCloseUserDialog()
    await this.fetchData()
    Toast.success('修改成功')
  }

  // 添加按钮点击
  onAddUserClick = async () => {
    await fetcher.one(this.props.$department.c_fetchSelectList)
    this.userDialog && this.userDialog.$clear()
    this.onOpenUserDialog()
  }

  // 编辑按钮点击
  onEditUserClick = async data => {
    let res = await fetcher.all([
      [await this.props.$user.c_fetchOneById, data.id],
      this.props.$department.c_fetchSelectList
    ])
    res = res[0]
    res.departmentId = res.department ? res.department.id : ''
    this.userDialog && this.userDialog.$fill(res)
    this.onOpenUserDialog()
  }

  // 删除用户点击
  onDelUserClick = data => {
    this.setState({
      delUserDialogVisible: true,
      delUserDialogData: data,
    })
  }

  // 打开用户弹层
  onOpenUserDialog = () => {
    this.setState({
      userDialogVisible: true
    })
  }

  // 关闭用户弹层
  onCloseUserDialog = () => {
    this.setState({
      userDialogVisible: false
    })
  }

  // 关闭删除用户弹层
  onCloseDelUserDialog = () => {
    this.setState({
      delUserDialogVisible: false
    })
  }

  // 确认删除用户
  onDelUserSubmit = async data => {
    if (data && data.id) {
      await fetcher.one(this.props.$user.c_del, data.id)
      await this.fetchData()
      this.onCloseDelUserDialog()
      Toast.success('删除成功')
    }
    else {
      Toast.error('系统错误')
    }
  }

}