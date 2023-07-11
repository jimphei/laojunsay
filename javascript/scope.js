var a = 10;
function foo() {
 console.log(a);
}
function bar() {
 var a = 20;
 foo();
}
bar(); 