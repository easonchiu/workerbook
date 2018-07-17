import Toast from 'src/components/toast'
import Loading from 'src/components/loading'

export default class Event {
  fetchData = async (pager = 1) => {
    try {
      Loading.show()
      await Promise.all([
        this.props.$user.c_fetchList({
          skip: pager * 30 - 30,
          limit: 30,
        })
      ])
    }
    catch (err) {
      Toast.error(err.message)
    }
    finally {
      Loading.hide()
    }
  }

  // 获取所有部门信息
  fetchDepartments = async () => {
    try {
      await this.props.$department.c_fetchSelectList()
    }
    catch (err) {
      Toast.error(err.message)
    }
  }

  // 翻页
  onPageClick = pager => {
    this.fetchData(pager)
  }

  // 新增人员提交
  onAddUserSubmit = async data => {
    try {
      Loading.show()
      await this.props.$user.c_create(data)
      this.onCloseUserDialog()
      await this.fetchData()
      Toast.success('添加成功')
    }
    catch (err) {
      Toast.error(err.message)
    }
    finally {
      Loading.hide()
    }
  }

  // 修改人员提交
  onEditUserSubmit = async data => {
    try {
      Loading.show()
      await this.props.$user.c_update(data)
      this.onCloseUserDialog()
      await this.fetchData()
      Toast.success('修改成功')
    }
    catch (err) {
      Toast.error(err.message)
    }
    finally {
      Loading.hide()
    }
  }

  // 添加按钮点击
  onAddUserClick = () => {
    this.userDialog && this.userDialog.$clear()
    this.onOpenUserDialog()
  }

  // 编辑按钮点击
  onEditUserClick = async data => {
    try {
      Loading.show()
      const res = await this.props.$user.c_fetchOneById(data.id)
      this.userDialog && this.userDialog.$fill(res)
      this.onOpenUserDialog()
    }
    catch (err) {
      Toast.error(err.message)
    }
    finally {
      Loading.hide()
    }
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
      try {
        Loading.show()
        await this.props.$user.c_del(data.id)
        await this.fetchData()
        this.onCloseDelUserDialog()
        Toast.success('删除成功')
      }
      catch (err) {
        Toast.error(err.message)
      }
      finally {
        Loading.hide()
      }
    }
    else {
      Toast.error('系统错误')
    }
  }

}