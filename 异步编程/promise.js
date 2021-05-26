/**
 * 手撸Promise
 * 一、基础实现
 * 1. promise就是一个类。在执行时传入一个执行器，执行器立即执行。
 * 2. promise 有三种状态,一旦状态改变就不可再变
 * 3. 两个函数（resolve，reject）来改变状态
 * 4. then方法内部做的事情就是根据状态调用相应的成功失败状态。then方法是定义实在原型中的
 * 5. then 函数中成功回调有回调的值，失败会有失败的原因
 * 二、异步实现
 * 1.当执行器中是异步代码的时候，会先执行then函数。所以在then中我们要判断他的状态，
 *  当时peding的时候，先将回调函数储存起来。等到异步函数执行完后的时候，再去调用
 * 2. then函数的链式调用，将上上一个then的返回值传给下一个then
 * 3. 当then返回是一个普通值的时候，直接传给下一个then的来接收。当传的是一个promise对象，要先判断他的状态在进行resolve和reject
 * 4. 返回promise实例是她自己本身。promise在new promise的过程中是获取不到的。所以这里需要给它做异步处理
 * 
 * 三、all，race方法的实现
 * 1. all方法作用：输入一个数组，当里面的额所有函数执行完成并且resolved才输出，并且输出和输入的顺序完全一致。循环放入res结果
 * 2. 这里有个问题，就是在有异步的时候就会遍历完直接resolve（result），所以在定义一个index，当resolved的时候给他加一，然后对比传入数组长度
 * 3. resolve 方法
 *  */

const PENDING = 'pending'
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class Mypromise {
  constructor(executor) {
    this.failCallbacks = [];
    this.successCallbacks = [];
    this.stutas = PENDING;
    this.value = undefined;
    this.reason = undefined;

    let resolve = (val) => {
      // 如果状态不是等待，组织程序运行
      if (this.stutas !== PENDING) return;
      this.stutas = FULFILLED;
      this.value = val;
      this.successCallbacks.forEach((fn) => {
        fn();
      });
    };
    let reject = (res) => {
      // 如果状态不是等待，组织程序运行
      if (this.stutas !== PENDING) return;
      this.stutas = REJECTED;
      this.reason = res;
      this.failCallbacks.forEach((fn) => {
        fn();
      });
    };
    executor(resolve, reject);
  }
  
  then(successCallback, failCallback) {
    let promise = new Mypromise((ress, rejj) => {
      if (this.stutas === FULFILLED) {
        setTimeout(() => {
          let x = successCallback(this.value);
          resolvePromise(x, ress, rejj, promise);
        }, 0);
        
      
      } else if (this.stutas === REJECTED) {
        let x = failCallback(this.reason);
        resolvePromise(x, ress, rejj);
      } else {
        this.successCallbacks.push(() => {
          setTimeout(() => {
            let x = successCallback(this.value);
            resolvePromise(x, ress, rejj, promise);
          }, 0);
        });
        this.failCallbacks.push(() => {
          let x = failCallback(this.reason);
          rejj(x)
        });
      }
    });
    return promise;
  }
  static all(list) {
    let results = []
    let num = 0
    return new Mypromise((res, rej) => {
      for (let i = 0; i < list.length; i++){
        let current = list[i]
        if (current instanceof Mypromise) {
          current.then((val) => {
            results[i] = val;
            num++
            if (num === list.length) {
              res(results);
            }
          }, (reason) => {
            rej(reason);
          }) 
        } else {
          results[i] = current;
          num++
          if (num === list.length) {
            res(results);
          }
        }
        
      }
      
    })
  }
  static resolve (value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
  static race (list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
  finally (cb) {
    return this.then(
      value  => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    );
  }

}


function resolvePromise(x, resolve, reject, promise) {
  if (x === promise) {
    reject('error')
  }
  if (x instanceof Mypromise) {
    x.then(resolve);
  } else {
    resolve(x);
  }
}
