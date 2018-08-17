import Toast from 'src/components/toast'
import fetcher from 'src/utils/fetcher'

export default class Event {
  // 获取首页需要的数据
  fetchData = async (page = 1) => {
    await fetcher.one(this.props.$project.fetchList, {
      skip: page * 6 - 6,
      limit: 6,
    })
  }

  // 翻页点击
  onProjectPageClick = p => {
    this.fetchData(p)
    this.props.history.push('?page=' + p)
  }

  // 打开任务详情
  onMissionClick = async id => {
    const res = await fetcher.one(this.props.$mission.fetchOneById, id)
    this.setState({
      missionDetailDialogVisible: true,
      missionDetailDialogDate: res,
    })
  }

  // 关闭任务详情
  onCloseMissionDetailDialog = () => {
    this.setState({
      missionDetailDialogVisible: false
    })
  }

  // 打开分配任务弹层
  onOpenAssignMissionDialog = () => {
    this.setState({
      assignMissionDialogVisible: true
    })
  }

  // 关闭分配任务弹层
  onCloseAssignMissionDialog = () => {
    this.setState({
      assignMissionDialogVisible: false
    })
  }

  // 添加任务按钮点击
  onAddAssignMissionClick = async project => {
    const departments = project.departments ? project.departments.map(item => item.id) : []
    await fetcher.one(this.props.$user.fetchSubList, departments)
    if (this.assignMissionDialog) {
      this.assignMissionDialog.$clear()
      this.assignMissionDialog.$project(project)
    }
    this.onOpenAssignMissionDialog()
  }

  // 编辑任务点击
  onEditAssignMissionClick = async data => {
    const project = data.project || {}
    if (project.isTimeout) {
      Toast.error('项目已过期，请联系管理员')
      return
    }
    const res = await fetcher.all([
      [this.props.$mission.fetchOneById, data.id],
      [this.props.$user.fetchSubList, project.departments]
    ])
    if (this.assignMissionDialog) {
      const mission = res[0]
      mission.deadline = mission.deadline ? new Date(mission.deadline) : new Date()
      mission.userId = mission.user ? mission.user.id : ''
      this.assignMissionDialog.$fill(mission)
      this.assignMissionDialog.$project(project)
    }
    this.onOpenAssignMissionDialog()
  }

  // 新增任务提交
  onAssignMissionSubmit = async data => {
    await fetcher.one(this.props.$mission.create, data)
    this.onCloseAssignMissionDialog()
    const p = this.search.page || 1
    await fetcher.one(this.props.$project.fetchList, {
      skip: p * 3 - 3,
      limit: 3,
    })
    Toast.success('添加成功')
  }

  // 修改任务提交
  onEditAssignMissionSubmit = async data => {
    await fetcher.one(this.props.$mission.update, data)
    this.onCloseAssignMissionDialog()
    this.onCloseMissionDetailDialog()
    const p = this.search.page || 1
    await fetcher.one(this.props.$project.fetchList, {
      skip: p * 3 - 3,
      limit: 3,
    })
    Toast.success('修改成功')
  }

  // 删除任务提交
  onDelMissionSubmit = async data => {
    await fetcher.one(this.props.$mission.del, data)
    this.onCloseAssignMissionDialog()
    this.onCloseMissionDetailDialog()
    const p = this.search.page || 1
    await fetcher.one(this.props.$project.fetchList, {
      skip: p * 3 - 3,
      limit: 3,
    })
    Toast.success('修改成功')
  }

}