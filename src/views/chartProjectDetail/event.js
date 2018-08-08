import fetcher from 'src/utils/fetcher'

export default class Event {

  // 获取首页需要的数据
  fetchData = async () => {
    const id = this.props.match.params.id
    await fetcher.all([
      [this.props.$analytics.fetchProjectSummary, id],
      [this.props.$analytics.fetchProjectDetail, id],
    ])
  }

}