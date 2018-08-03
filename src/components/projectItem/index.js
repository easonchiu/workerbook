import './style'
import React from 'react'
import classNames from 'classnames'

import IconDescription from 'src/components/svg/description'
import IconClose from 'src/components/svg/close'
import IconAdd from 'src/components/svg/add'
import UserHeader from 'src/components/userHeader'
import Toast from 'src/components/toast'
import Progress from 'src/components/progress'

class ProjectItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showDesc: false,
      showDescAni: false,
    }
  }

  // 展开和收起详情
  onToggleDescClick = () => {
    clearTimeout(this.t)
    if (!this.state.showDesc) {
      this.setState({
        showDesc: true,
      })
      this.t = setTimeout(() => {
        this.setState({
          showDescAni: true,
        })
      })
    }
    else {
      this.setState({
        showDescAni: false,
      })
      this.t = setTimeout(() => {
        this.setState({
          showDesc: false,
        })
      }, 300)
    }
  }

  // 添加任务
  onAddAssignMissionClick = () => {
    const source = this.props.source || {}
    if (source.isDelay) {
      Toast.error('项目已超过截至时间，不能添加任务')
      return
    }
    this.props.onAddAssignMissionClick &&
    this.props.onAddAssignMissionClick(source)
  }

  renderMissions() {
    const { props } = this
    const source = props.source || {}

    const Item = data => {
      const user = data ? data.user ? data.user : {} : {}
      const css = classNames('item', {
        'timeout': data.isDelay
      })
      return (
        <div
          className={css}
          key={data.id}
          onClick={() => {
            props.onMissionClick &&
            props.onMissionClick(data.id, source)
          }}
        >
          <UserHeader
            mini
            id={user.id}
            name={user.nickname}
            self={user.id === props.userId}
            status={user.isDelete ? 99 : user.status}
          />
          <div className="info">
            <h6>{data.name}</h6>
            <time>截至时间 {(new Date(data.deadline)).format('yyyy年 MM月dd日')}</time>
          </div>
          <Progress width={40} value={data.progress} isDelay={data.isDelay} />
        </div>
      )
    }

    return (
      <div className="missions">
        <header className="header">
          <h5>任务列表</h5>
          <a
            href="javascript:;"
            onClick={this.onAddAssignMissionClick}
          >
            <IconAdd />添加
          </a>
        </header>
        {
          source.missions && source.missions.length ?
            <div className="list scroller">
              {
                source.missions.map(item => <Item key={item.id} {...item} />)
              }
              <p className="tips">共{source.missions.length + '个'}任务</p>
            </div> :
            <p className="empty">暂无任务</p>
        }
      </div>
    )
  }

  render() {
    const { props } = this
    const source = props.source || {}

    return (
      <div className="wb-project-item">
        <h2>
          {
            source.weight === 2 ?
              <span className="weight-2">重要</span> :
              source.weight === 3 ?
                <span className="weight-3">紧急</span> :
                null
          }
          {source.name}
        </h2>
        <Progress width={60} value={source.progress} color="blue" />
        <div className="departments">
          {
            source.departments ?
              source.departments.map(item => (
                <em key={item.id}>{item.name}</em>
              )) :
              null
          }
        </div>

        {this.renderMissions()}

        {
          this.state.showDesc ?
            <div
              className={classNames('description', {
                'ani-in': this.state.showDescAni
              })}
            >
              <div className="desc-inner">
                <h3>项目说明</h3>
                <IconClose.A className="close" onClick={this.onToggleDescClick} />
                {
                  source.description ?
                    <p>{source.description}</p> :
                    <p className="empty">暂无说明</p>
                }
              </div>
              <div className="desc-bg" onClick={this.onToggleDescClick} />
            </div> :
            null
        }

        <footer className="footer">
          <p>
            <span>时间周期</span>
            {new Date(source.createTime).format('yyyy年 MM月dd日')}
            {' ~ '}
            {new Date(source.deadline).format('yyyy年 MM月dd日')}
          </p>
          <IconDescription.A onClick={this.onToggleDescClick} />
        </footer>
      </div>
    )
  }
}

export default ProjectItem