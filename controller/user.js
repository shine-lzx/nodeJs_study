var db = require('../conf/db')
const login = (phone, password) => {
  try {
    let sql = `SELECT * from user WHERE phone="${phone}" and password="${password}"`
    db.query(sql, (results) => {
      return results
    })
  } catch (error) {
    return error
  }
}

const register = ({ userId, name, gender, phone, password }) => {
  try {
    let sql = `INSERT INTO user(userId, name, gender, phone, password) VALUES("${userId}","${name}",${gender},"${phone}","${password}")`
    db.query(sql, (results) => {
      return results
    })
  } catch (error) {
    return error
  }
}

module.exports = {
  login,
  register,
}
