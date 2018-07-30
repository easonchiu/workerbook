import './style'
import React, { PureComponent } from 'react'
import Err from 'src/utils/errif'
import className from 'classnames'

import Input from 'src/components/input'
import Button from 'src/components/button'
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

  // 任务选择
  onMissionChange = e => {
    this.setState({
      missionId: e
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
    Err.IfEmpty(this.state.missionId, '请选择任务')

    if (!Err.Handle()) {
      this.props.onCreate &&
      this.props.onCreate({
        content: this.state.content.trim(),
        progress: this.state.progress,
        missionId: this.state.missionId,
      })
    }
  }

  // 清除内容
  $clear = () => {
    this.setState({
      content: '',
      rewriteId: '',
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
        content: this.state.rewriteContent.trim(),
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
      if (item.mission && item.mission.id && item.project && item.project.id) {
        const key = item.mission.id
        if (typeof data[key] === 'undefined') {
          data[key] = { list: [] }
        }
        data[key]['mission'] = key
        data[key]['progress'] = item.progress
        data[key]['groupTitle'] = item.project.name + item.mission.name
        data[key]['list'].push({
          content: item.content,
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

    return (
      <div className="daily-list">
        {
          Object.values(data).map((item, i) => {
            const headerCss = className('header', 'clearfix', {
              'setting': item.mission === this.state.setProgressId
            })
            return (
              <div key={i} className="item">
                <div className={headerCss}>
                  <span />
                  <strong>{item.groupTitle} - {item.progress}</strong>
                  <div className="progress clearfix">
                    <span>任务进度 <em>{item.progress} %</em></span>
                    <IconRewrite.A
                      tips="修改进度"
                      onClick={this.onSetProgressClick.bind(null, item)}
                    />
                  </div>
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
          })
        }
      </div>
    )
  }

  // 任务select
  renderMissionSelect() {
    const missions = this.props.missionSelect || []
    return (
      <Select
        value={this.state.missionId}
        onClick={this.onMissionChange}
        className="select-missions"
        placeholder="请选择任务"
      >
        {
          missions.map(item => (
            <Select.Option key={item.id} value={item.id}>{item.text}</Select.Option>
          ))
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
          {this.renderProgressSelect()}
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
        <div className="icon" />
        <div className="content">
          {this.renderMyDailyList()}
          {this.renderWriter()}
        </div>
      </div>
    )
  }
}

export default MyDailyWriter