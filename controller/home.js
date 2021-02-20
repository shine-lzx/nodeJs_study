var db = require('../conf/db')

const ranking = (type) => {
  let _sql = 'SELECT * FROM ranking'
  db.query(_sql, [], function (results, fields) {
    if (type === '1') {
      return results.splice(1, 3).map((item) => {
        return {
          ...item,
          shopPic: `http://192.168.200.110:3000/static/images/${item.shopPic}`,
        }
      })
    } else {
      return results.map((item) => {
        return {
          ...item,
          shopPic: `http://192.168.200.110:3000/static/images/${item.shopPic}`,
        }
      })
    }
  })
}

module.exports = {
  ranking,
}
