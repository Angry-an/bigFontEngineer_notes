const _ = require('lodash');
function add(a,b,c) {
  return a+b+c;
}
// console.log(add(1, 3,3));
const curried = _.curry(add);
console.log(curried(1,2,3));
console.log(curried(1)(2)(3));
console.log(curried(2)(1, 3));
