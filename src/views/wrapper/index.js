import './style'
import React from 'react'
import AsyncComponent from 'src/hoc/asyncComponent'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import className from 'classnames'
import VIEW from 'src/hoc/view'
import fetcher from 'src/utils/fetcher'
import { clearToken } from 'src/utils/token'

import MainDialog from 'src/containers/mainDialog'
import Form from 'src/containers/form'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Err from 'src/utils/errif'
import Toast from 'src/components/toast'

const Index = AsyncComponent(() => import('src/views/index'))
const Project = AsyncComponent(() => import('src/views/project'))
const Chart = AsyncComponent(() => import('src/views/chart'))
const ChartDepartmentDetail = AsyncComponent(() => import('src/views/chartDepartmentDetail'))
const ChartProjectDetail = AsyncComponent(() => import('src/views/chartProjectDetail'))
const Console = AsyncComponent(() => import('src/views/console'))

@VIEW
class Wrapper extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dialogChangePwVisible: false,
      password: '',
      newPassword: '',
      newPassword2: '',
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    await fetcher.one(this.props.$user.fetchProfile)
  }

  // 退出登录
  logout = () => {
    clearToken()
    this.props.history.replace('/login')
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
            <Link className={nav === 'chart' ? 'active' : ''} to="/chart/project">统计</Link>
            {
              profile.role === 99 ?
                <Link
                  className={nav === 'console' ? 'active' : ''}
                  to="/console/user"
                >
                  管理后台
                </Link> :
                null
            }
          </nav>
          <div className="profile">
            <h6>晚上好：{profile.nickname}</h6>
            {
              profile.title && department.name ?
                <p>{profile.title}@{department.name}</p> :
                department.name ?
                  <p>{department.name}</p> :
                  null
            }
            <span>
              <a
                href="javascript:;"
                onClick={() => {
                  this.setState({
                    dialogChangePwVisible: true
                  })
                }}
              >
                修改密码
              </a>
              <a href="javascript:;" onClick={this.logout}>
                退出帐号
              </a>
            </span>
          </div>
        </div>
      </header>
    )
  }

  // 修改密码表单字段修改
  onPwFormChange = e => {
    const key = e.target.name
    this.setState({
      [key]: e.target.value.substr(0, 20)
    })
  }

  // 修改密码提交
  changePwSubmit = async () => {
    Err.IfEmpty(this.state.password, '原密码不能为空')
    Err.IfEmpty(this.state.newPassword, '新密码不能为空')
    Err.IfEmpty(this.state.newPassword2, '请再次确认新密码')
    Err.IfDiff(this.state.newPassword, this.state.newPassword2, '再次密码输入不一致')
    if (Err.Handle()) {
      return
    }
    await fetcher.one(this.props.$user.changePwd, {
      password: this.state.password,
      newPassword: this.state.newPassword,
    })
    Toast.success('修改成功，请重新登录')
    clearToken()
    this.props.history.replace('/login')
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
          <p>WorkerBook @2017-2019 Auto FE</p>
        </div>

        <MainDialog
          title="修改密码"
          visible={this.state.dialogChangePwVisible}
          className="dialog-change-password"
          onClose={() => {
            this.setState({
              dialogChangePwVisible: false
            })
          }}
        >
          <Form>
            <Form.Row label="原密码">
              <Input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onPwFormChange}
              />
            </Form.Row>
            <Form.Row label="新密码">
              <Input
                name="newPassword"
                type="password"
                value={this.state.newPassword}
                onChange={this.onPwFormChange}
              />
            </Form.Row>
            <Form.Row label="确认密码">
              <Input
                name="newPassword2"
                type="password"
                value={this.state.newPassword2}
                onChange={this.onPwFormChange}
              />
            </Form.Row>
            <Form.Row>
              <Button onClick={this.changePwSubmit}>
                修改
              </Button>
            </Form.Row>
          </Form>
        </MainDialog>

      </div>
    )
  }
}

export default Wrapper