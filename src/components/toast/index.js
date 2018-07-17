import './style'

class Toast {
  static list = []

  static success(msg) {
    this.show(msg, 2000, 'success')
  }

  static error(msg) {
    this.show(msg, 2000, 'error')
  }

  static show(val, duration = 2000, css) {
    let toast = document.createElement('div')
    toast.classList.add('wb-toast')
    toast.classList.add('wb-toast--' + css)
    toast.id = 'j-wb-toast' + (new Date() - 0)
    toast.innerHTML = `<div class="wb-toast__inner"><p>${val}</p></div>`

    document.body.appendChild(toast)
    this.list.unshift(toast)
    this.list.forEach((item, i) => {
      item.style.top = `${i * 60 + 20}px`
    })

    setTimeout(function () {
      toast.classList.add('wb-toast--show')
    })

    setTimeout(() => {
      this.hide(true, toast.id)
    }, duration)

    const focusdom = document.querySelector(':focus')
    if (focusdom) {
      focusdom.blur()
    }
  }

  static hide(animate = true, id = 'j-wb-toast') {
    let toast = document.getElementById(id)
    if (toast) {
      if (animate) {
        toast.classList.remove('wb-toast--show')
        toast.classList.add('wb-toast--hide')
        setTimeout(() => {
          try {
            document.body.removeChild(toast)
            this.list.pop()
          }
          catch (e) {
          }
        }, 200)
      }
      else {
        document.body.removeChild(toast)
      }
    }
  }
}

export default Toast