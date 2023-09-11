// 柯里化
function curry(func) {
    return function curried(...args) {
      if (args.length >= func.length) {//func.length返回sum函数的参数数量
        return func.apply(this, args);
      } else {
        return function (...args2) {
          return curried.apply(this, [...args, ...args2]);
        };
      }
    };
  }
  
  function sum(a, b, c) {
    return a + b + c;
  }
  
  const curriedSum = curry(sum);//先函数名

  console.log(curriedSum(1)(2)(3)); // 6