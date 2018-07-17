export default class Event {

  // 获取首页需要的数据
  fetchData = async () => {
    try {
      await Promise.all([
        this.props.$user.fetchProfile(),
        this.props.$project.fetchList()
      ])
    }
    catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  click = () => {
    this.setState({
      showMission: true
    })
  }

  hide = () => {
    this.setState({
      showMission: false
    })
  }

}