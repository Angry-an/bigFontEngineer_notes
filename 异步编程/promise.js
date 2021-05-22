/**
 * 手撸Promise
 * 一、基础实现
 * 1. promise就是一个类。在执行时传入一个执行器，执行器立即执行。
 * 2. promise 有三种状态,一旦状态改变就不可再变
 * 3.两个函数（resolve，reject）来改变状态
 * 4. then方法内部做的事情就是根据状态调用相应的成功失败状态。then方法是定义实在原型中的
 * 5. then 函数中成功回调有回调的值，失败会有失败的原因
 * 二、异步实现
 * 1.当执行器中是异步代码的时候，会先执行then函数。所以在then中我们要判断他的状态，
 *  当时peding的时候，先将回调函数储存起来。等到异步函数执行完后的时候，再去调用
 * 2. then函数的链式调用，将上上一个then的返回值传给下一个then
 * 3.
 *  */

const PENDING = 'pending'
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class Mypromise {
  constructor(executor) {
    console.log('CONSTOR');
     this.successCallbacks = [];
     this.failCallbacks = [];
     this.stutas = PENDING;
     this.value = undefined;
     this.reason = undefined;
    
    const resolve = (val) => {
      // 如果状态不是等待，组织程序运行
      if (this.stutas !== PENDING) return;
      this.stutas = FULFILLED;
      this.value = val;
      this.successCallbacks.length > 0 &&
        this.successCallbacks.forEach((fn) => {
          fn();
        });
    };
    const reject = (res) => {
      // 如果状态不是等待，组织程序运行
      if (this.stutas !== PENDING) return;
      this.stutas = REJECTED;
      this.reason = res;
      // this.failCallback && this.failCallback(this.reason);
      this.failCallbacks.forEach((fn) => {
        fn();
      });
    };
    executor(resolve, reject);
   
  }
  then(successCallback, failCallback) {
    console.log(this.successCallbacks,'then');
    let promise = new Mypromise((ress, rejj) => {
      if (this.stutas === FULFILLED) {
        let x = successCallback(this.value);
        ress(x);
      }
      else if (this.stutas === REJECTED) {
        let x = failCallback(this.reason);
        rejj(x);
      }
      else {
        this.successCallbacks.push(() => { successCallback(this.value);});
        this.failCallbacks.push(() => {failCallback(this.reason)});
      }
    });
    return promise;
  }
}
