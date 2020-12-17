const login = (account, password) => {
  if (account === 'shine' && password === '123123') {
    return {
      accountId: '123456789',
      token: 'gwuchwhisdcasojcoaslc[pweqofkekvolml',
    }
  } else {
    return {
      msg: '登录失败',
    }
  }
}

const register = () => {}

module.exports = {
  login,
}
