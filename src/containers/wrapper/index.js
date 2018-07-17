import './style'
import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const Header = props => {
  const { profile, nav } = props
  return (
    <header className="wb-header">
      <div className="wb-header__inner">
        <a className="logo" href="javascript:;" />
        <nav>
          <Link className={nav === 'index' ? 'active' : ''} to="/index">日报</Link>
          <Link className={nav === 'project' ? 'active' : ''} to="/project">项目</Link>
          <Link className={nav === 'events' ? 'active' : ''} to="/events">日程</Link>
          <Link className={nav === 'chart' ? 'active' : ''} to="/chart">数据</Link>
          <Link className={nav === 'console' ? 'active' : ''} to="/console/user">管理后台</Link>
        </nav>
        <div className="profile">
          <h6>晚上好：{profile.nickname}</h6>
          <p>{profile.title}@{profile.departmentName}</p>
          <span>
            <a href="javascript:;">修改密码</a>
            <a href="javascript:;">退出帐号</a>
          </span>
        </div>
      </div>
    </header>
  )
}

const Body = props => {
  return (
    <div className="wb-body">
      {props.children}
    </div>
  )
}

Body.Main = props => {
  return (
    <main className="wb-body__main">
      {props.children}
    </main>
  )
}

Body.Aside = props => {
  return (
    <aside className="wb-body__aside">
      {props.children}
    </aside>
  )
}

const Footer = props => {
  return (
    <div className="wb-footer">
      <p>WorkerBook @2017-2019 React & Gin</p>
    </div>
  )
}

const Full = props => {
  const css = classNames('wb-full', props.className)
  return (
    <div className={css}>
      <div className="wb-full__inner">
        {props.children}
      </div>
    </div>
  )
}

export default {
  Header,
  Body,
  Footer,
  Full,
}