import Toast from 'src/components/toast'
import fetcher from 'src/utils/fetcher'

export default class Event {
  // 获取首页需要的数据
  fetchData = async () => {
    await fetcher.all([
      this.props.$user.fetchProfile,
      this.props.$project.fetchList,
      this.props.$user.fetchSubList,
    ])
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
  onAddAssignMissionClick = project => {
    if (this.assignMissionDialog) {
      this.assignMissionDialog.$clear()
      this.assignMissionDialog.$project(project)
    }
    this.onOpenAssignMissionDialog()
  }

  // 编辑任务点击
  onEditAssignMissionClick = async data => {
    const res = await fetcher.one(this.props.$mission.fetchOneById, data.id)
    if (this.assignMissionDialog) {
      res.deadline = res.deadline ? new Date(res.deadline) : new Date()
      res.userId = res.user ? res.user.id : ''
      this.assignMissionDialog.$fill(res)
      this.assignMissionDialog.$project(data.project)
    }
    this.onOpenAssignMissionDialog()
  }

  // 新增任务提交
  onAssignMissionSubmit = async data => {
    await fetcher.one(this.props.$mission.create, data)
    this.onCloseAssignMissionDialog()
    await fetcher.one(this.props.$project.fetchList)
    Toast.success('添加成功')
  }

  // 修改任务提交
  onEditAssignMissionSubmit = async data => {
    await fetcher.one(this.props.$mission.update, data)
    this.onCloseAssignMissionDialog()
    this.onCloseMissionDetailDialog()
    await fetcher.one(this.props.$project.fetchList)
    Toast.success('修改成功')
  }

}