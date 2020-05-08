// // 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();

// // 绑定事件及事件的处理程序
// eventEmitter.on('eventName', eventHandler);

// // 触发事件
// eventEmitter.emit('eventName');



// // 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();

// // 创建事件处理程序
// var connectHandler = function connected () {
//   console.log('连接成功。');

//   // 触发 data_received 事件 
//   eventEmitter.emit('data_received');
// }

// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);

// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function () {
//   console.log('数据接收成功。');
// });

// // 触发 connection 事件 
// eventEmitter.emit('connection');

// console.log("程序执行完毕。");

var events = require('events');
var eventEmitter = new events.EventEmitter();

// // 监听器 #1
// var listener1 = function listener1 () {
//   console.log('监听器 listener1 执行。');
// }

// // 监听器 #2
// var listener2 = function listener2 () {
//   console.log('监听器 listener2 执行。');
// }

// // 绑定 connection 事件，处理函数为 listener1 
// eventEmitter.addListener('connection', listener1);

// // 绑定 connection 事件，处理函数为 listener2
// eventEmitter.on('connection', listener2);

// var eventListeners = eventEmitter.listenerCount('connection');
// console.log(eventListeners + " 个监听器监听连接事件。");

// // 处理 connection 事件 
// eventEmitter.emit('connection');

// // 移除监绑定的 listener1 函数
// eventEmitter.removeListener('connection', listener1);
// console.log("listener1 不再受监听。");

// // 触发连接事件
// eventEmitter.emit('connection');

// eventListeners = eventEmitter.listenerCount('connection');
// console.log(eventListeners + " 个监听器监听连接事件。");

// console.log("程序执行完毕。");


// on 函数用于绑定事件函数，emit 属性用于触发一个事件。
eventEmitter.on('someEvent', (arg1, arg2) => {
  console.log('listener1', arg1, arg2);
});

eventEmitter.emit('someEvent'); 