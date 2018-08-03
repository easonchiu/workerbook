import Toast from 'src/components/toast'
import fetcher from 'src/utils/fetcher'

export default class Event {
  fetchData = async (pager = 1) => {
    await fetcher.one(this.props.$department.c_fetchList, {
      skip: pager * 5 - 5,
      limit: 5,
    })
  }

  // 翻页
  onPageClick = p => {
    this.fetchData(p)
    this.props.history.push('?page=' + p)
  }

  // 新增部门提交
  onAddDepartmentSubmit = async data => {
    await fetcher.one(this.props.$department.c_create, data)
    this.onCloseDepartmentDialog()
    await this.fetchData()
    Toast.success('添加成功')
  }

  // 修改部门提交
  onEditDepartmentSubmit = async data => {
    await fetcher.one(this.props.$department.c_update, data)
    this.onCloseDepartmentDialog()
    await this.fetchData()
    Toast.success('修改成功')
  }

  // 添加按钮点击
  onAddDepartmentClick = () => {
    this.departmentDialog && this.departmentDialog.$clear()
    this.onOpenDepartmentDialog()
  }

  // 编辑按钮点击
  onEditDepartmentClick = async data => {
    const res = await fetcher.one(this.props.$department.c_fetchOneById, data.id)
    this.departmentDialog && this.departmentDialog.$fill(res)
    this.onOpenDepartmentDialog()
  }

  // 删除按钮点击
  onDelDepartmentClick = data => {
    this.setState({
      delDepartmentDialogVisible: true,
      delDepartmentDialogData: data,
    })
  }

  // 打开弹层
  onOpenDepartmentDialog = () => {
    this.setState({
      departmentDialogVisible: true
    })
  }

  // 关闭删除弹层
  onCloseDelDepartmentDialog = () => {
    this.setState({
      delDepartmentDialogVisible: false
    })
  }

  // 确定删除部门
  onDelDepartmentSubmit = async data => {
    if (data && data.id) {
      if (data.userCount !== 0) {
        Toast.error('请先将该部门内的用户移出')
        return
      }
      await fetcher.one(this.props.$department.c_del, data.id)
      await this.fetchData()
      this.onCloseDelDepartmentDialog()
      Toast.success('删除成功')
    }
    else {
      Toast.error('系统错误')
    }
  }

  // 关闭弹层
  onCloseDepartmentDialog = () => {
    this.setState({
      departmentDialogVisible: false
    })
  }

}