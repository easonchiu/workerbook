import fetcher from 'src/utils/fetcher'

export default class Event {
  // 获取首页需要的数据
  fetchData = async () => {
    await fetcher.all([
      this.props.$user.fetchProfile,
      [this.props.$department.fetchList, {
        skip: 0,
        limit: 5,
      }]
    ])
  }

  // 侧栏分组翻页
  groupPageChange = async page => {
    const { limit } = this.props.department$.departments
    await fetcher.one(this.props.$department.fetchList, {
      skip: (page - 1) * limit,
      limit
    })
  }

  // 侧栏分组点击
  groupClick = async gid => {
    await fetcher.one(this.props.$user.fetchList, { gid })
  }

  // 侧栏项目点击
  projectClick = async pid => {
    console.log(pid)
  }

  // 删除我今天写的日报
  deleteDailyClick = async id => {
    try {
      await this.props.$user.deleteDailyItem({ id })
      this.reload()
    }
    catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  // 添加日报（发布按钮点击）
  appendDaily = async ({ record, progress, project }) => {
    try {
      await this.props.$user.appendDailyItem({
        record,
        progress,
        project,
      })
      this.$myDailyWriter && this.$myDailyWriter.clear()
      this.reload()
    }
    catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

}