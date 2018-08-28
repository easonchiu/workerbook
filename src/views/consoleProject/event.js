import Toast from 'src/components/toast'
import fetcher from 'src/utils/fetcher'

export default class Event {
  fetchData = async (pager = this.search.page || 1) => {
    await fetcher.one(this.props.$project.c_fetchList, {
      skip: pager * 5 - 5,
      limit: 5,
    })
  }

  // 翻页
  onPageClick = p => {
    this.fetchData(p)
    this.props.history.push('?page=' + p)
  }

  // 新增项目提交
  onAddProjectSubmit = async data => {
    await fetcher.one(this.props.$project.c_create, data)
    this.onCloseProjectDialog()
    await this.fetchData()
    Toast.success('添加成功')
  }

  // 修改项目提交
  onEditProjectSubmit = async data => {
    await fetcher.one(this.props.$project.c_update, data)
    this.onCloseProjectDialog()
    await this.fetchData()
    Toast.success('修改成功')
  }

  // 项目添加按钮点击
  onAddProjectClick = async () => {
    await fetcher.one(this.props.$department.c_fetchSelectList)
    this.projectDialog && this.projectDialog.$clear()
    this.onOpenProjectDialog()
  }

  // 项目编辑按钮点击
  onEditProjectClick = async data => {
    let res = await fetcher.all([
      [await this.props.$project.c_fetchOneById, data.id],
      this.props.$department.c_fetchSelectList
    ])
    res = res[0]
    res.departments = res.departments ? res.departments.map(i => i.id) : []
    res.deadline = res.deadline ? new Date(res.deadline) : new Date()
    this.projectDialog && this.projectDialog.$fill(res)
    this.onOpenProjectDialog()
  }

  // 项目删除按钮点击
  onDelProjectClick = data => {
    if (data.name && data.id) {
      this.setState({
        delProjectDialogVisible: true,
        delProjectDialogData: data,
      })
    }
    else {
      Toast.error('系统错误')
    }
  }

  // 关闭项目删除弹层
  onCloseDelProjectDialog = () => {
    this.setState({
      delProjectDialogVisible: false
    })
  }

  // 确定删除项目
  onDelProjectSubmit = async data => {
    if (data && data.id) {
      await fetcher.one(this.props.$project.c_del, data.id)
      await this.fetchData()
      this.onCloseDelProjectDialog()
      Toast.success('删除成功')
    }
    else {
      Toast.error('系统错误')
    }
  }

  // 打开项目弹层
  onOpenProjectDialog = () => {
    this.setState({
      projectDialogVisible: true
    })
  }

  // 关闭项目弹层
  onCloseProjectDialog = () => {
    this.setState({
      projectDialogVisible: false
    })
  }
}