import './style'
import React, { PureComponent } from 'react'
import Err from 'src/utils/errif'
import className from 'classnames'

import Input from 'src/components/input'
import Button from 'src/components/button'
import Progress from 'src/components/progress'
import Select from 'src/components/select'
import IconDel from 'src/components/svg/delete'
import IconRewrite from 'src/components/svg/rewrite'
import Toast from 'src/components/toast'

class MyDailyWriter extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      progress: 5,
      missionId: '',
      rewriteId: '',
      rewriteContent: '',
      deleteId: '',
      type: '',

      setProgressId: '',
      serProgressValue: 5,
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listener)
  }

  parentHasCss = (el1, css) => {
    let el = el1
    while (el.nodeName) {
      if (el && el.classList.contains(css)) {
        return true
      }
      if (el.parentElement) {
        el = el.parentElement
      }
      else {
        return false
      }
    }
  }

  listener = e => {
    if (!this.parentHasCss(e.target, 'delete-content')) {
      document.removeEventListener('click', this.listener)
      this.setState({
        deleteId: '',
        setProgressId: '',
        setProgressValue: '',
      })
    }
  }

  // 任务/日常选择
  onMissionChange = e => {
    const isMission = (/\*\*mission/).test(e)
    console.log(isMission)
    this.setState({
      missionId: e,
      type: isMission ? 'mission' : 'events',
    })
  }

  // 日报内容编辑
  onContentChange = e => {
    this.setState({
      content: e.target.value
    })
  }

  // 删除日报点击
  onDeleteClick = data => {
    this.setState({
      deleteId: data.id
    })
    document.addEventListener('click', this.listener)
  }

  // 确认删除日报
  onConfirmDelete = () => {
    Err.IfEmpty(this.state.deleteId, '请选择日报')

    if (!Err.Handle()) {
      this.props.onDelete &&
      this.props.onDelete(this.state.deleteId)
    }
  }

  // 取消删除日报
  onCancelDelete = () => {
    this.setState({
      deleteId: ''
    })
    document.removeEventListener('click', this.listener)
  }

  // 添加日报（发布按钮点击）
  onAppendClick = () => {
    Err.IfEmpty(this.state.content, '日报内容不能为空')
    Err.IfEmpty(this.state.missionId, '请选择任务或日常')

    if (!Err.Handle()) {
      const select = this.state.missionId.split('**')
      this.props.onCreate &&
      this.props.onCreate({
        record: this.state.content.trim(),
        progress: this.state.progress,
        [select[1] === 'events' ? 'eventId' : 'missionId']: select[0],
        type: select[1],
      })
    }
  }

  // 清除内容
  $clear = () => {
    this.setState({
      content: '',
      type: '',
      rewriteId: '',
      missionId: '',
      rewriteContent: '',
      deleteId: '',
    })
    document.removeEventListener('click', this.listener)
  }

  // 进度编辑
  progressChange = e => {
    this.setState({
      progress: e
    })
  }

  // 修改按钮点击
  onRewriteClick = data => {
    this.setState({
      rewriteId: data.id,
      rewriteContent: data.content,
    })
  }

  // 取消修改点击
  onCancelRewrite = () => {
    this.setState({
      rewriteId: '',
      rewriteContent: '',
    })
  }

  // 修改提交
  onSubmitRewrite = () => {
    Err.IfEmpty(this.state.rewriteContent, '日报内容不能为空')
    Err.IfEmpty(this.state.rewriteId, '系统错误')

    if (!Err.Handle()) {
      this.props.onEdit &&
      this.props.onEdit({
        record: this.state.rewriteContent.trim(),
        id: this.state.rewriteId,
      })
    }
  }

  // 修改日报内容
  onRewriteContentChange = e => {
    this.setState({
      rewriteContent: e.target.value
    })
  }

  // 修改进度点击
  onSetProgressClick = data => {
    this.setState({
      setProgressId: data.mission,
      setProgressValue: data.progress,
    })
    document.addEventListener('click', this.listener)
  }

  // 日报编写区 - 我已经写的日报
  renderMyDailyList() {
    const dailies = this.props.dailies || []
    const data = {}
    dailies.forEach(item => {
      // 这是任务
      if (item.missionId && item.projectId) {
        const key = item.missionId
        if (typeof data[key] === 'undefined') {
          data[key] = { list: [] }
        }
        data[key]['type'] = 'mission'
        data[key]['mission'] = key
        data[key]['progress'] = item.progress
        data[key]['groupTitle'] = <strong><em>{item.projectName}</em>{item.missionName}</strong>
        data[key]['list'].push({
          content: item.record,
          id: item.id,
        })
      }
      // 这是日常
      else if (item.eventId) {
        const key = item.eventId
        if (typeof data[key] === 'undefined') {
          data[key] = { list: [] }
        }
        data[key]['type'] = 'events'
        data[key]['groupTitle'] = <strong><em>日常</em>{item.eventName}</strong>
        data[key]['list'].push({
          content: item.record,
          id: item.id,
        })
      }
    })

    const dailyItem = (data, i) => {
      if (this.state.rewriteId === data.id) {
        return (
          <div className="content edit-content clearfix" key={data.id}>
            <sup>{i + 1}.</sup>
            <Input
              multi={true}
              value={this.state.rewriteContent}
              onChange={this.onRewriteContentChange}
              className="rewrite-input"
              placeholder="请输入日报内容"
            />
            <div className="rewrite-btns">
              <Button
                onClick={this.onSubmitRewrite}
              >
                修改
              </Button>
              <Button
                light
                onClick={this.onCancelRewrite}
              >
                取消
              </Button>
            </div>
          </div>
        )
      }
      const isDeleting = this.state.deleteId === data.id
      return (
        <div
          className={className('content', 'clearfix', {
            'delete-content': isDeleting
          })}
          role="delete-content"
          key={data.id}
        >
          <sup>{i + 1}.</sup>
          <p>{data.content}</p>
          {
            isDeleting ?
              <div className="tools clearfix">
                <Button mini danger onClick={this.onConfirmDelete}>
                  删除
                </Button>
                <Button mini light onClick={this.onCancelDelete}>
                  取消
                </Button>
              </div> :
              <div className="tools clearfix">
                <IconDel.A
                  tips="删除"
                  onClick={this.onDeleteClick.bind(this, data)}
                />
                <IconRewrite.A
                  tips="编辑"
                  onClick={this.onRewriteClick.bind(this, data)}
                />
              </div>
          }
        </div>
      )
    }

    const list = Object.values(data)
    return (
      <div className="daily-list">
        {
          list && list.length ?
            list.map((item, i) => {
              const headerCss = className('header', 'clearfix', {
                'setting': item.mission === this.state.setProgressId
              })
              return (
                <div key={i} className="item">
                  <div className={headerCss}>
                    {
                      item.type === 'mission' ?
                        <Progress value={item.progress} width={40} /> :
                        null
                    }
                    {item.groupTitle}
                    {
                      item.type === 'mission' ?
                        <div className="progress clearfix">
                          <span>任务进度 <em>{item.progress} %</em></span>
                          <IconRewrite.A
                            tips="修改进度"
                            onClick={this.onSetProgressClick.bind(null, item)}
                          />
                        </div> :
                        null
                    }
                  </div>
                  {
                    this.state.setProgressId === item.mission ?
                      this.renderWrittenProgressSelect() :
                      null
                  }
                  {
                    item.list.map(dailyItem)
                  }
                </div>
              )
            }) :
            <p className="empty">今天还没写过日报哦~</p>
        }
      </div>
    )
  }

  // 任务select
  renderMissionSelect() {
    const missions = this.props.missionSelect || []
    const events = this.props.eventsSelect || []

    const missionsOptions = () => {
      if (missions.length) {
        const list = missions.map(item => (
          <Select.Option
            key={item.id}
            value={item.id + '**mission'}
          >
            <h2>{item.text.p}</h2>
            <span>{item.text.t}</span>
          </Select.Option>
        ))
        list.unshift(<p key="missions-title" className="title">任务</p>)
        return list
      }
      return []
    }

    const eventsOptions = () => {
      if (events.length) {
        const list = events.map(item => (
          <Select.Option
            key={item.id}
            value={item.id + '**events'}
          >
            {item.text}
          </Select.Option>
        ))
        list.unshift(<p key="events-title" className="title">日常</p>)
        return list
      }
      return []
    }

    return (
      <Select
        value={this.state.missionId}
        onClick={this.onMissionChange}
        className="select-missions_events"
        placeholder="请选择任务 / 日常"
      >
        {
          [...missionsOptions(), ...eventsOptions()]
        }
      </Select>
    )
  }

  // 进度select
  renderProgressSelect() {
    const progress = '5_10_15_20_25_30_35_40_45_50_55_60_65_70_75_80_85_90_95_100'
    return (
      <Select
        value={this.state.progress}
        onClick={this.progressChange}
        className="select-progress"
        placeholder="任务进度"
      >
        {
          progress.split('_').map(i => (
            <Select.Option
              key={i}
              value={i - 0}
              text={<p><span>任务进度</span>{i}%</p>}
            >
              {i}<span>%</span>
            </Select.Option>
          ))
        }
      </Select>
    )
  }

  // 编辑已写任务进度的提交
  onSetProgress = val => {
    if (this.props.onSetProgress && this.state.setProgressId) {
      this.props.onSetProgress({
        missionId: this.state.setProgressId,
        progress: val,
      })
    }
    else {
      Toast.error('系统错误')
    }
  }

  // 编辑已写任务的进度
  renderWrittenProgressSelect() {
    const progress = '5_10_15_20_25_30_35_40_45_50_55_60_65_70_75_80_85_90_95_100'
    return (
      <Select
        value={this.state.setProgressValue}
        onClick={this.onSetProgress}
        className="select-progress"
        placeholder="任务进度"
        visible={true}
      >
        {
          progress.split('_').map(i => (
            <Select.Option
              key={i}
              value={i - 0}
              text={<p><span>任务进度</span>{i}%</p>}
            >
              {i}<span>%</span>
            </Select.Option>
          ))
        }
      </Select>
    )
  }

  // 日报编写区 - 新建日报面板
  renderWriter() {
    return (
      <div className="writer-box">
        <Input
          multi={true}
          className="writer-input"
          placeholder="请输入日报内容"
          value={this.state.content}
          onChange={this.onContentChange}
        />

        <div className="tools clearfix">
          {this.renderMissionSelect()}
          {
            this.state.type === 'mission' ?
              this.renderProgressSelect() :
              null
          }
          <Button className="send-button" onClick={this.onAppendClick}>
            发布一条
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="wb-daily-writer">
        <div className="icon">
          <svg viewBox="0 0 1025 1024" width="256.25" height="256">
            <path
              d="M940.64 82.56c-52.64-52.576-121.952-82.56-190.272-82.56-57.632 0-110.688 21.376-149.44 60.064l-155.744 156.928c-0.48 0.448-1.024 0.736-1.504 1.216-0.256 0.256-0.416 0.608-0.672 0.832l0.064 0.064-330.528 333.088c-15.232 15.136-26.272 33.984-32.416 54.56l-75.168 272.256c-0.064 0.736-4.96 22.112-4.96 32.992 0 61.824 50.208 112 112.128 112 12.32 0 36.16-5.888 37.024-6.016l271.296-71.328c20.608-6.112 39.328-17.248 54.56-32.512l488.416-492.256c88.832-88.896 78.816-237.888-22.784-339.328zM512.448 761.44c-2.624-28.864-10.784-57.184-23.008-84.064l302.56-302.528c18.496 58.432 8.992 119.552-31.552 160.128-0.256 0.256-0.576 0.416-0.8 0.672l0.448 0.416-247.296 249.28c0-7.968 0.384-15.776-0.352-23.904zM473.376 648.192c-11.936-19.616-25.504-38.56-42.304-55.328-19.552-19.552-41.984-34.88-65.408-47.744l305.024-305.024c23.936 10.624 46.88 25.76 67.136 46.016 17.312 17.248 30.688 36.576 40.992 56.672l-305.44 305.408zM335.552 529.984c-29.632-11.936-60.672-18.752-91.776-19.168l246.496-248.384c37.728-36.8 92.672-47.392 146.784-33.984l-301.504 301.536zM133.344 955.936c-3.488 0.8-14.336 3.552-21.696 4.064-26.304-0.32-47.648-21.696-47.648-48 0.384-5.376 2.528-14.624 3.264-17.984l33.696-122.048c36.576-0.992 75.936 13.248 106.88 44.256 31.424 31.36 46.208 71.488 44.608 108.512l-119.104 31.2zM283.968 916.384c-0.768-42.944-18.24-87.616-53.504-122.816-33.344-33.376-76.992-52.64-120.512-54.368l31.872-115.424c2.304-7.68 6.88-15.264 12.512-21.888 64.192-45.952 162.912-32.384 231.488 36.256 72.544 72.512 83.744 178.752 27.872 242.176-3.712 1.952-7.456 3.808-11.488 4.992l-118.24 31.072zM918.112 376.704l-53.888 54.304c0-7.232 0.864-14.176 0.192-21.568-5.632-61.92-34.496-121.792-81.376-168.608-52.128-52.16-121.248-82.08-189.696-82.272l52.992-53.44c26.528-26.464 63.552-41.12 104.032-41.12 51.488 0 104.384 23.296 145.056 63.84 38.176 38.112 60.928 85.472 64.192 133.376 3.008 44.704-11.744 85.696-41.504 115.488z"
            />
          </svg>
        </div>
        <div className="content">
          {this.renderMyDailyList()}
          {this.renderWriter()}
        </div>
      </div>
    )
  }
}

export default MyDailyWriter