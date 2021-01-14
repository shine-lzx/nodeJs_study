var mysql = require('mysql')
var dbConfig = require('./db.config')

module.exports = {
  query: (sql, callback) => {
    let connection = mysql.createConnection(dbConfig)
    connection.connect((err) => {
      if (err) throw err
      connection.query(sql, (err, results) => {
        if (err) throw err
        callback && callback(JSON.parse(JSON.stringify(results)))
        connection.end((err) => {
          if (err) throw err
        })
      })
    })
  },
}
