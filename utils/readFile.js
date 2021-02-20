const fs = require('fs')

const readFileFun = (filePath) => {
  let fileArr = []

  fs.readdir(filePath, (err, files) => {
    try {
      files.forEach((item, i) => {
        fileArr.push(item)
      })
      console.log('fileArr: ', fileArr)
      return fileArr
    } catch (error) {
      console.log('error: ', error)
    }
  })
}

module.exports = {
  readFileFun,
}
