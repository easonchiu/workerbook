import './style'

class Loading {
  static show() {
    const has = document.getElementById('j-wb-loading')
    clearTimeout(this.t)
    if (has) {
      document.body.removeChild(has)
    }

    let loading = document.createElement('div')
    loading.classList.add('wb-loading')
    loading.id = 'j-wb-loading'
    loading.innerHTML = `<div class="wb-loading__inner"></div>`
    console.log(loading)
    document.body.appendChild(loading)
    setTimeout(() => {
      loading.classList.add('wb-loading--ani')
    })
    const focusdom = document.querySelector(':focus')
    if (focusdom) {
      focusdom.blur()
    }
  }

  static hide() {
    let loading = document.getElementById('j-wb-loading')
    if (loading) {
      loading.classList.add('wb-loading--quick')
      this.t = setTimeout(() => {
        document.body.removeChild(loading)
      }, 400)
    }
  }
}

export default Loading