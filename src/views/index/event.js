import fetcher from 'src/utils/fetcher'
import Toast from 'src/components/toast'

export default class Event {
  // 获取首页需要的数据
  fetchData = async () => {
    await fetcher.all([
      [this.props.$department.fetchList, {
        skip: 0,
        limit: 5,
      }],
      this.props.$mission.fetchOwnsList,
      this.props.$daily.fetchToday,
      this.props.$daily.fetchListByDay,
    ])
  }

  // 侧栏部门翻页
  departmentPageChange = async page => {
    const { limit } = this.props.department$.departments
    await fetcher.one(this.props.$department.fetchList, {
      skip: (page - 1) * limit,
      limit
    })
  }

  // 侧栏部门点击
  departmentClick = async gid => {
    await fetcher.one(this.props.$user.fetchList, { gid })
  }

  // 发布新日报
  onCreateDaily = async data => {
    await fetcher.one(this.props.$daily.create, data)
    await fetcher.all([
      this.props.$daily.fetchToday,
      this.props.$daily.fetchListByDay,
      this.props.$mission.fetchOwnsList,
    ])
    if (this.myDailyWriter) {
      this.myDailyWriter.$clear()
    }
    Toast.success('发布成功')
  }

  // 修改日报
  onEditDaily = async data => {
    await fetcher.one(this.props.$daily.update, data)
    await fetcher.all([
      this.props.$daily.fetchToday,
      this.props.$daily.fetchListByDay,
    ])
    if (this.myDailyWriter) {
      this.myDailyWriter.$clear()
    }
    Toast.success('修改成功')
  }

  // 删除日报
  onDeleteDaily = async id => {
    await fetcher.one(this.props.$daily.del, { id })
    await fetcher.all([
      this.props.$daily.fetchToday,
      this.props.$daily.fetchListByDay,
      this.props.$mission.fetchOwnsList,
    ])
    if (this.myDailyWriter) {
      this.myDailyWriter.$clear()
    }
    Toast.success('删除成功')
  }

}