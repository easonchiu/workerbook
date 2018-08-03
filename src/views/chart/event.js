import fetcher from 'src/utils/fetcher'

export default class Event {

  // 获取项目的数据
  fetchProjectData = async (page = 1) => {
    await fetcher.one(this.props.$analytics.fetchProjectsList, {
      skip: page * 9 - 9,
      limit: 9,
    })
  }

  // 获取部门数据
  fetchDepartmentData = async (page = 1) => {
    await fetcher.one(this.props.$analytics.fetchDepartmentsList, {
      skip: page * 9 - 9,
      limit: 9,
    })
  }

  // tab点击
  onTabsClick = i => {
    if (this.state.tabsIndex !== i) {
      this.setState({
        tabsIndex: i
      })
      if (i === 0) {
        this.fetchProjectData()
      }
      else {
        this.fetchDepartmentData()
      }
    }
  }

  // 部门翻页
  onProjectPageClick = p => {
    this.fetchProjectData(p)
  }

  // 部门翻页
  onDepartmentPageClick = p => {
    this.fetchDepartmentData(p)
  }

}