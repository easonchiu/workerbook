import fetcher from 'src/utils/fetcher'
import Toast from 'src/components/toast'
import qs from 'qs'

export default class Event {
  // 获取首页需要的数据
  fetchData = async () => {
    const role = this.props.user$.profile.role
    const list = [
      [this.props.$department.fetchList, {
        skip: 0,
        limit: 8,
      }],
      this.fetchListByDay,
      [this.props.$user.fetchList, {
        skip: 0,
        limit: 12,
      }],
    ]

    if (role !== 99) {
      list.push(
        this.props.$mission.fetchOwnsList,
        this.props.$daily.fetchToday,
        this.props.$events.fetchList,
      )
    }

    await fetcher.all(list)
  }

  // 获取日报列表
  fetchListByDay = () => {
    const search = this.search
    let day = search.day
    if (day) {
      day = day.replace(/-/g, '')
    }
    return this.props.$daily.fetchListByDay({
      date: day || 0,
      department: search.department || ''
    })
  }

  // 天选择器change
  dayPickerChange = async e => {
    this.setState({
      dayPickerValue: e
    })
    const d = e.format('yyyy-MM-dd')
    const search = this.search
    search.day = d
    await this.props.history.replace('?' + qs.stringify(search))
    fetcher.one(this.fetchListByDay)
  }

  // 天选择
  dayClick = async day => {
    this.setState({
      dayPickerValue: null
    })
    const search = this.search
    search.day = day
    await this.props.history.replace('?' + qs.stringify(search))
    fetcher.one(this.fetchListByDay)
  }

  // 侧栏部门翻页
  departmentPageChange = async page => {
    const { limit } = this.props.department$.departments
    await fetcher.one(this.props.$department.fetchList, {
      skip: (page - 1) * limit,
      limit
    })
  }

  // 侧栏用户翻页
  userPageChange = async page => {
    const { limit } = this.props.user$.users
    await fetcher.one(this.props.$user.fetchList, {
      skip: (page - 1) * limit,
      limit
    })
  }

  // 侧栏部门点击
  departmentClick = async id => {
    this.setState({
      department: id
    })
    const search = this.search
    if (id) {
      search.department = id
    }
    else {
      delete search.department
    }
    await this.props.history.replace('?' + qs.stringify(search))
    fetcher.all([
      [this.props.$user.fetchList, {
        skip: 0,
        limit: 12,
        departmentId: id || '',
      }],
      this.fetchListByDay
    ])
  }

  // 发布新日报
  onCreateDaily = async data => {
    await fetcher.one(this.props.$daily.create, data)
    await fetcher.all([
      this.props.$daily.fetchToday,
      this.fetchListByDay,
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
      this.fetchListByDay,
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
      this.fetchListByDay,
      this.props.$mission.fetchOwnsList,
    ])
    if (this.myDailyWriter) {
      this.myDailyWriter.$clear()
    }
    Toast.success('删除成功')
  }

  // 修改已写日报的任务的进度
  onSetMissionProgress = async data => {
    await fetcher.one(this.props.$daily.updateProgress, data)
    await fetcher.all([
      this.props.$daily.fetchToday,
      this.fetchListByDay,
      this.props.$mission.fetchOwnsList,
    ])
    if (this.myDailyWriter) {
      this.myDailyWriter.$clear()
    }
    Toast.success('更新成功')
  }

}