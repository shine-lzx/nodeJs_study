// 阻塞与非阻塞
var fs = require("fs");



// 阻塞代码实例 readFileSync()方法是其同步方法的版本，会产生阻塞效果
var data = fs.readFileSync('../files/doc/file0.txt');
console.log('读取文件内容：', data.toString());
console.log("程序执行结束!");





// readFile()是异步的方法
// ！！回调函数的第一个参数为错误信息
fs.readFile('../files/doc/file0.txt', function (err, data) {
  if (err) return console.error(err);
  console.log(data.toString());
});

console.log("程序执行结束!");

/**以上两个实例我们了解了阻塞与非阻塞调用的不同。第一个实例在文件读取完后才执行程序。 
第二个实例我们不需要等待文件读取完，这样就可以在读取文件时同时执行接下来的代码，大大提高了程序的性能。
因此，阻塞是按顺序执行的，而非阻塞是不需要按顺序的，所以如果需要处理回调函数的参数，我们就需要写在回调函数内。 */

