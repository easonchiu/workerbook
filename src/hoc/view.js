/**
 * 视图用的高阶组件
 *
 * 1. 连接redux
 * 2. this.search拿到浏览器地址中的?a=1&b=2参数，以对象形式返回
 * 3. this.params拿到this.props.match.params对象
 *
 */

import connect from 'src/redux/connect'
import qs from 'qs'

const VIEW = Comp => {
  @connect
  class VIEWComponent extends Comp {
    get search() {
      return this.props.location ?
        qs.parse(this.props.location.search.replace(/^\?/, '')) : {}
    }

    get params() {
      return this.props.match ? this.props.match.params : {}
    }
  }
  return VIEWComponent
}

export default VIEW
