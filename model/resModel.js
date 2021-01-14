class BasicModel {
  constructor(data) {
    this.data = data
  }
}

class Succeed extends BasicModel {
  constructor(data, msg = '成功') {
    super(data)
    this.msg = msg
    this.code = '00000'
  }
}

class Failed extends BasicModel {
  constructor(data, code, msg = '失败') {
    super(data)
    this.code = code ? code : '99999'
    this.msg = msg
  }
}

module.exports = {
  Succeed,
  Failed,
}
