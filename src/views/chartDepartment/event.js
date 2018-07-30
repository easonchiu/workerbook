import fetcher from 'src/utils/fetcher'
// import Toast from 'src/components/toast'

export default class Event {

  // 获取首页需要的数据
  fetchData = async () => {
    fetcher.one(this.props.$chart.fetcuDepartmentUsersSummary, '5b5eb67b7179e585bf263523')
  }

}