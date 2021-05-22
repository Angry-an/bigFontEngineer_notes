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

const person = {
  name: '钱晓安',
  sayName: () => {
    console.log(this.name); //undefined
  },
  sayName1: function () {
    console.log(this.name); // 钱晓安
  },

  sayAsync2: () => {
    setTimeout(() => {
      console.log(this.name); // undefined
    }, 1000);
  },
  sayAsync3: () => {
    setTimeout(function() {
      console.log(this.name); // undefined
    }, 1000);
  },
  sayAsync: function () {
    // let _this = this
    setTimeout(function () {
      console.log(this.name); // undefined
    }, 1000);
  },
  sayAsync1: function () {
    setTimeout(() => {
      console.log(this.name); // 钱晓安
    }, 1000);
  },
};
// person.sayName();
// person.sayName1();
// person.sayAsync2()
person.sayAsync3();
