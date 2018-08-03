import './style'
import React from 'react'
import AsyncComponent from 'src/hoc/asyncComponent'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import className from 'classnames'
import VIEW from 'src/hoc/view'
import fetcher from 'src/utils/fetcher'

const Index = AsyncComponent(() => import('src/views/index'))
const Project = AsyncComponent(() => import('src/views/project'))
const Chart = AsyncComponent(() => import('src/views/chart'))
const ChartDepartmentDetail = AsyncComponent(() => import('src/views/chartDepartmentDetail'))
const ChartProjectDetail = AsyncComponent(() => import('src/views/chartProjectDetail'))
const Console = AsyncComponent(() => import('src/views/console'))

@VIEW
class Wrapper extends React.PureComponent {
  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    await fetcher.one(this.props.$user.fetchProfile)
  }

  renderHeader() {
    const page = this.props.location.pathname
    let { profile } = this.props.user$
    const nav = page.replace(/(.+?)\/.+$/, '$1').replace(/\//, '')
    profile = profile || {}
    const department = profile.department || {}
    return (
      <header className="wb-header">
        <div className="wb-header__inner">
          <a className="logo" href="javascript:;" />
          <nav>
            <Link className={nav === 'index' ? 'active' : ''} to="/index">日报</Link>
            <Link className={nav === 'project' ? 'active' : ''} to="/project">项目</Link>
            <Link className={nav === 'events' ? 'active' : ''} to="/events">日程</Link>
            <Link className={nav === 'chart' ? 'active' : ''} to="/chart/project">数据</Link>
            <Link className={nav === 'console' ? 'active' : ''} to="/console/user">管理后台</Link>
          </nav>
          <div className="profile">
            <h6>晚上好：{profile.nickname}</h6>
            <p>{profile.title}@{department.name}</p>
            <span>
              <a href="javascript:;">修改密码</a>
              <a href="javascript:;">退出帐号</a>
            </span>
          </div>
        </div>
      </header>
    )
  }

  render() {
    return (
      <div
        className={className('wb-app', {
          'wb-app-console': this.props.location.pathname.indexOf('/console') === 0
        })}
      >
        {this.renderHeader()}
        <div className="wb-body">
          <Switch>
            <Route exact path="/index" component={Index} />
            <Route exact path="/project" component={Project} />
            <Route exact path="/chart/:p" component={Chart} />
            <Route exact path="/chart/department/:id" component={ChartDepartmentDetail} />
            <Route exact path="/chart/project/:id" component={ChartProjectDetail} />
            <Route exact path="/console/:p" component={Console} />
            <Redirect to="/index" />
          </Switch>
        </div>
        <div className="wb-footer">
          <p>WorkerBook @2017-2019 React & Gin</p>
        </div>
      </div>
    )
  }
}

export default Wrapper