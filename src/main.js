var fs = require("fs");
var path = require("path");
// // 删除文件
// fs.unlink('./assets/files/input.txt', (err) => {
//   if (err) throw err;
//   console.log('已成功地删除文件');
// });

//同步
// fs.mkdirSync("./tmp/");
// fs.mkdirSync("./tmp/test/");

// //异步
// fs.mkdir("./tmp/", function (err) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log("tmp目录创建成功。");
//   fs.mkdir("./tmp/test/", function (err) {
//     if (err) {
//       return console.error(err);
//     }
//     console.log("test目录创建成功。");
//   });
// });

// 递归创建目录 异步方法  
// function mkdirs (dirname, callback) {
//   fs.exists(dirname, function (exists) {
//     if (exists) {
//       callback();
//     } else {
//       // console.log(path.dirname(dirname));  
//       mkdirs(path.dirname(dirname), function () {
//         fs.mkdir(dirname, callback);
//         console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录');
//       });
//     }
//   });
// }

// // 递归创建目录 同步方法
// function mkdirsSync (dirname) {
//   if (fs.existsSync(dirname)) {
//     return true;
//   } else {
//     if (mkdirsSync(path.dirname(dirname))) {
//       fs.mkdirSync(dirname);
//       return true;
//     }
//   }
// }

// mkdirs('hello/a/b/c', () => {
//   console.log('done');
// })

// mkdirsSync('hello/a/b/c');


const writeFileRecursive = function (path, buffer, callback) {
  let lastPath = path.substring(0, path.lastIndexOf("/"));
  fs.mkdir(lastPath, { recursive: true }, (err) => {
    if (err) return callback(err);
    fs.writeFile(path, buffer, function (err) {
      if (err) return callback(err);
      return callback(null);
    });
  });
}

for (let i = 0; i < 10; i++) {
  let buffer = `file${i}`;
  writeFileRecursive(`./files/doc/file${i}.txt`, buffer, (err) => {
    if (err) console.error(err);
    console.info("write success");
  });
}