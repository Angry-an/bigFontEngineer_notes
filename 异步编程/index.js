
/** 
 * web中的ajax，node中的大文件的读写。。都需要用到异步来操作
 * 对于开启过后立即去执行下一个任务
 * */ 


/**事件循环
 * 执行栈
 * web apis
 * eventloop事件循环 负责监听调用栈和消息队列，当执行栈中没有了，就去将消息队列取出第一个压入执行栈
 * queue 消息队列
 */
// console.log('global begin');
// setTimeout(() => {
//   console.log('111111');
// }, 1800);

// setTimeout(() => {
//   console.log('22222');
//   setTimeout(() => {
//     console.log('333333');
//   }, 1000);
// }, 1000);
// console.log('00000');


/** 回调函数（所有异步编程的根本）
 * 1. 传递函数参数
*/

// function onIt(fn) {
//   setTimeout(() => {
//     fn()
//   }, 1000);
// }
// onIt(function () {
//   console.log(111222)
// })

/**promise
 * 封装一个ajax
 */
function ajax(url) {
  return new Promise((res,rej) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function() {
      if (this.status === 200) {
        res(this.response)
      }
    }
    xhr.send()
  })
}

/**
 * promise几个静态方法
 * Promise.resolve 将一个值转化一个promise对象
 * Promise.all 将多个promise并行,所有任务结束后才结束
 * Promise.race 将多个promise并行
 * 
 */

// Promise.resolve('foo')
//   .then((res) => {
//   console.log(res)
// })

// const p1 = new Promise((res,rej) => {
//   setTimeout(() => {
//     rej('1111');
//   }, 1100);
// })
// const p2 = new Promise((res) => {
//   setTimeout(() => {
//     res('22222');
//   }, 2000);
// });

// Promise.race([p1, p2]).then((res) => {
//   console.log(res);
// })

/**
 * generator
 * 相比于传统异步函数处理方式回调函数，promise解决了地域回调问题。但是还是有大量的回调，没有传统代码同步方式
 *  */
function * fon() {
  console.log('start');
  yield new Promise((res) => {
    setTimeout(() => {
    res('seccess')
  }, 1000);})
  // yield 'success1'
}
const g = fon()
const res = g.next()
console.log(res)
// res.value.then(data => {
//   g.next(data)
// })
