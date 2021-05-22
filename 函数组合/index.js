// 柯里话会将函数携程洋葱代码。通过函数组合解决这种问题
function compose(f,g) {
  return function (value) {
    return f(g(value))
  }
}
function reverse(arr) {
  return arr.reverse()
}
function first(arr) {
  return arr[0]
}

let last = compose(first, reverse);
console.log(last([1, 2, 4, 5]));


/**
 * 闭包
 * 
 */
