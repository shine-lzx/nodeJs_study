const assert = require('assert').strict;
// 在nodejsh中有一个assert模块，这个模块主要用于内部断言测试使用，我们也可以在项目中使用assert模块进行断言的判断。 
// 如果是true则测试通过，如果是false则测试不通过。 
// 关键点：第一参数value是测试的值，第二个是测试结果的提示，默认第二个参数为空
// assert(1)   //ok
// assert(false, '发生错误')//AssertiononError: msg
// assert(false)   //AssertiononError: false == true

// assert(1 == 2, '两者并不相等');
// output:  AssertionError: 两者并不相等

assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]); // 前后不相等