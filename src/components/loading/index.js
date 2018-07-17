import './style'

class Loading {
  static show() {
    const has = document.getElementById('j-wb-loading')
    if (!has) {
      let loading = document.createElement('div')
      loading.classList.add('wb-loading')
      loading.id = 'j-wb-loading'
      loading.innerHTML = `<div class="wb-loading__inner"></div>`
      document.body.appendChild(loading)
    }
    const focusdom = document.querySelector(':focus')
    if (focusdom) {
      focusdom.blur()
    }
  }

  static hide() {
    let loading = document.getElementById('j-wb-loading')
    if (loading) {
      document.body.removeChild(loading)
    }
  }
}

export default Loading