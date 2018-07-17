export default class Event {

  // 获取首页需要的数据
  fetchData = async () => {
    try {
      await Promise.all([
        this.props.$user.fetchProfile(),
      ])
    }
    catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

}