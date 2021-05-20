// 1. 控制纯函数的副作用 2. 处理异常
/**
 * Contonor就是一个函子对象，函子对象就像一个盒子，我们的值始终在盒子里面。
 * 永远不去取出来值,我们想用对这个值进行处理可以通过调用map方法。
 * 可以不停的.map，这就是链式编程
 */

// 面向对象
// class Contontor {
//   constructor(value) {
//     this._value = value;
//   }
//   map(fn) {
//     return new Contontor(fn(this._value));
//   }
// }

// let con = new Contontor(5)
//   .map((x) => x + 1)
//   .map((x) => x * x);

// 函数式编程
// class Contonor {
//   constructor(value) {
//     this._value = value;
//   }
//   static of(val) {
//     return new Contonor(val);
//   }
//   map(fn) {
//     return Contonor.of(fn(this._value))
//   }
// }
// let con = Contonor.of(5).map((x) => x + 1).map((x) => x * x);
// console.log(con._value)

// Mabe函子 : 处理传值为null的时候
// class Mabe {
//   constructor(value) {
//     this._value = value;
//   }
//   static of(val) {
//     return new Mabe(val);
//   }
//   map(fn) {
//     return this.isNpthing() ? Mabe.of(null) : Mabe.of(fn(this._value));
//   }
//   isNpthing() {
//     return this._value === null || this._value === undefined
//   }
// }
// let r = Mabe.of(null).map(x => x * 2).map(x => x * x).map(null)
// let r1= Mabe.of(5)
//   .map((x) => x * 2)
//   .map((x) => x * x)
//   .map(null);
// console.log(r,r1)


// Either函数处理异常
class Right{
  constructor(value) {
    this._value = value
  }
  static of(val) {
    return new Left(val)
  }
  map(fn) {
    return Left.of(fn(this._value))
  }
}
class Left {
  constructor(value) {
    this._value = value;
  }
  static of(val) {
    return new Left(val);
  }
  map(fn) {
    return this;
  }
}
function parseJSON(str) {
  try {
    return Right.of(JSON.parse(str));
  } catch (e) {
    return Left.of({error:e.message})
  }
}
let r = parseJSON('{ name: 123 }');
let r1 = parseJSON('{ "name": "123" }');
console.log(r1)
