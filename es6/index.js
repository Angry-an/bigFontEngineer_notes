/***
 * 块,有{}包裹着就是块，缺没有块作用域
 */
// if (1) {
//   var aa = 3
// }
// console.log(aa)

/***
 * const
 * 被声明后不能被修改：意思是被声明后不能重新指向内存地址
 */
// const obj = {}
// console.log((obj.name = '111'), 'okokok');
// console.log((obj = {}), 'nonono');

/**
 * 模板字符串标签函数 
 * */



/**
 * 字符串扩展方法
 * 1.includes
 * 2.startsWidth
 * 3.endsWidth
 *  */
// const str = 'this is app'
// console.log(str.startsWith('this'));
// console.log(str.endsWith('app'));
// console.log(str.includes('app'));


/**
 * 剩余参数
 */
// function fon(first,...arg) {
//   console.log(first,'111')
//   console.log(...arg, '2222');
// }
// fon(1, 2, 3, 4, 5)


/**
 * 展开数组
 * 打印不固定数组中的值
 */
// const arr = [1, 2, 3]
// console.log(arr[0],arr[1],arr[2]);
// console.log.apply(console, arr)
// console.log(...arr);


/**
 * 箭头函数
 * 1. 写法简洁
 * 2. 不会改变你this指向，指向当前作用域下的
 */

// const person = {
//   name: '钱晓安',
//   sayName: () => {
//     console.log(this.name); //undefined
//   },
//   sayName1: function () {
//     console.log(this.name); // 钱晓安
//   },

//   sayAsync2: () => {
//     setTimeout(() => {
//       console.log(this.name); // undefined
//     }, 1000);
//   },
//   sayAsync3: () => {
//     setTimeout(function() {
//       console.log(this.name); // undefined
//     }, 1000);
//   },
//   sayAsync: function () {
//     // let _this = this
//     setTimeout(function () {
//       console.log(this.name); // undefined
//     }, 1000);
//   },
//   sayAsync1: function () {
//     setTimeout(() => {
//       console.log(this.name); // 钱晓安
//     }, 1000);
//   },
// };
// person.sayAsync3();

/**Object.assign
 * 
 */
// let obj = { a: 1 }
// let obj1 = {}
// Object.assign(obj1,obj)


/**proxy
 * 监视摸个对象的读写
 */

// let obj = {
//   name: "qxa",
//   age:18
// }
// const proxyObj = new Proxy(obj, {
//   get(taret, propetry) {},
//   set(taret, propetry,value) {},
// });


/**Map
 * 对象的key只能是字符串，就算传入数组和对象也会经过tostring转你换为字符串
 * Map就是来解决这个问题的
 */
// var a = new Map()
// var tom = { a: 1 }
// a.set(tom,1);

/**for of
 * 遍历所有数据结构的同一方式：因为其内部调用了iterable方法得到一个迭代器，从而去遍历内部所有的数据
 * 1. break 种植循环（foreach不行）；其他可以终止遍历的是some，every
 * 2. 伪数组uekeyi遍历arguments
 */

/**迭代器模式 
 * 对外提供统一的遍历接口，让外部不用再去关心这个数据内部的结构是怎么样的
*/
// const obj = {
//   name: ['q', 'w', e],
//   age: [1, 2, 3, 4],
//   each: function (callback) {
//     const all = [...this.name, ...this.age]
//     for (const iterator of all) {
//       callback(iterator);
//     }
//   },
//   [Symbol.iterator]: function (params) {
//     const all = [...this.name, ...this.age];
//     let index = 0;
//     return {
//       next: function () {
//         return {
//           value: all[index],
//           done: index++ >= all.length
          
//         }
//        }
//     }
//   }
// }


/**生成器
 * 惰性执行。执行的时候生成了迭代器。通过next()惰性执行
 */ 
