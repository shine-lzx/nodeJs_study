console.log("a");
setTimeout(function () {
  console.log("b")
}, 0
);
console.log("c");

// 主线程执行完成才会执行消息队列中的异步任务

// 微任务
console.log('script start')

setTimeout(function () {
  console.log('timer over')
}, 0)

Promise.resolve().then(function () {
  console.log('promise1')
}).then(function () {
  console.log('promise2')
})

console.log('script end')

/**一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。
任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs。
macro-task大概包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。
micro-task大概包括: process.nextTick, Promise, Object.observe(已废弃), MutationObserver(H5新特性)
setTimeout/Promise等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。
来自不同任务源的任务会进入到不同的任务队列。其中setTimeout与setInterval是同源的。
事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。
之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的micro-task。
当所有可执行的micro-task执行完毕之后。循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task，这样一直循环下去。
其中每一个任务的执行，无论是macro-task还是micro-task，都是借助函数调用栈来完成。

作者：jeff_nz
链接：https://www.jianshu.com/p/50ab99baf026
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */
setTimeout(function () {
  console.log('timeout1');
})

new Promise(function (resolve) {
  console.log('promise1');
  for (var i = 0; i < 1000; i++) {
    i == 99 && resolve();
  }
  console.log('promise2');
}).then(function () {
  console.log('then1');
})

console.log('global1');

// setTimeout为宏任务，会被添加到消息队列中，构造函数（promise）是同步执行的，但是.then为异步，
//会被添加到微任务消息队列中，所以会先输出promise1，promise2，之后执行主线程之后的global1，再执行微任务队列中的then1，之后执行宏任务

// 执行结果为：
// promise1
// promise2
// global1
// then1
// timeout1

/**
 * 分析一下代码，首先程序开始执行，遇到setTimeout时将它添加到消息队列，等待后续处理，遇到Promise时会创建微任务（.then()里面的回调），
 * 注意此时new promise构造函数中的代码还是同步执行的，只有.then中的回调会被添加到微任务队列。因此会连续输出promise1和promise2。
 * 继续执行到console.log('global1')输出global1，到此调用栈中已经为空。此时微任务队列里有一个任务.then，宏任务队列里也有一个任务setTimout。
microtask必然是在某个宏任务执行的时候创建的，而在下一个宏任务开始之前，浏览器会对页面重新渲染(task >> 渲染 >> 下一个task(从任务队列中取一个))。
同时，在上一个宏任务执行完成后，渲染页面之前，会执行当前微任务队列中的所有微任务。也就是说，在某一个宏任务执行完后，在重新渲染与开始下一个宏任务之前，
就会将在它执行期间产生的所有微任务都执行完毕（在渲染前）。因此会执行.then输出then1，然后进行下一轮事件循环，取出任务队列中的setTimeout输出timeout1。
总结一下执行机制：

执行一个宏任务（栈中没有就从事件队列中获取）

执行过程中如果遇到微任务，就将它添加到微任务的任务队列中

宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）

当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染

渲染完毕后，JS引擎线程继续，开始下一个宏任务（从宏任务队列中获取）

作者：jeff_nz
链接：https://www.jianshu.com/p/50ab99baf026
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 *
 */