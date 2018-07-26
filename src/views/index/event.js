import fetcher from 'src/utils/fetcher'

export default class Event {
  // 获取首页需要的数据
  fetchData = async () => {
    await fetcher.all([
      [this.props.$department.fetchList, {
        skip: 0,
        limit: 5,
      }],
      this.props.$mission.fetchList
    ])
  }

  // 侧栏分组翻页
  departmentPageChange = async page => {
    const { limit } = this.props.department$.departments
    await fetcher.one(this.props.$department.fetchList, {
      skip: (page - 1) * limit,
      limit
    })
  }

  // 侧栏分组点击
  departmentClick = async gid => {
    await fetcher.one(this.props.$user.fetchList, { gid })
  }

}