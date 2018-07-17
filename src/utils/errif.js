import Toast from 'src/components/toast'

class Err {
  static errMsg = ''

  static Handle() {
    if (this.errMsg !== '') {
      Toast.error(this.errMsg)
      this.errMsg = ''
      return true
    }
    return false
  }

  static IfEmpty(str, msg) {
    let string = str
    if (typeof string === 'string') {
      string = string.trim()
    }
    if (this.errMsg === '' && (string === '' || string === null || typeof string === 'undefined')) {
      this.errMsg = msg
    }
  }

  static IfEmptyArr(arr, msg) {
    if (this.errMsg === '' && (!Array.isArray(arr) || arr.length === 0)) {
      this.errMsg = msg
    }
  }

  static IfLenMoreThen(str, len, msg) {
    if (this.errMsg === '' && str.trim().length > len) {
      this.errMsg = msg
    }
  }

  static IfLenLessThen(str, len, msg) {
    if (this.errMsg === '' && str.trim().length < len) {
      this.errMsg = msg
    }
  }
}

export default Err