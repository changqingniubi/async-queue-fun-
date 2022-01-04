/*
 * @Description: 
 * @Author: changqing
 * @Date: 2022-01-04 10:30:41
 * @LastEditTime: 2022-01-04 20:06:18
 * @LastEditors: changqing
 * @Usage: 
 */

//let AsyncQueue = require('webpack/lib/util/AsyncQueue');
let AsyncQueue = require('./AsyncQueue');
function processor(item, callback) {
    setTimeout(() => {
        console.log('process',item);
        callback(null, item);
    }, 3000);
}
const getKey = (item) => {
    return item.key;
}
/**
 * 相同key的 模块（任务） 不重复解析(执行)
 * parallelism 控制并发数量
 * processor 处理函数
 * getKey 判断是否是同一模块(任务)
 */
let queue  = new AsyncQueue({
    name:'createModule',parallelism:3,processor,getKey
});
const start = Date.now();
let item1 = {key:'module1'};
queue.add(item1,(err,result)=>{
    console.log(err,result);
    console.log(Date.now() - start);
});
queue.add(item1,(err,result)=>{
    console.log(err,result);
    console.log(Date.now() - start);
});
queue.add({key:'module2'},(err,result)=>{
    console.log(err,result);
    console.log(Date.now() - start);
});
queue.add({key:'module3'},(err,result)=>{
    console.log(err,result);
    console.log(Date.now() - start);
});
queue.add({key:'module4'},(err,result)=>{
    console.log(err,result);
    console.log(Date.now() - start);
});

// process { key: 'module1' }
// null { key: 'module1' }
// 3015
// null { key: 'module1' }
// 3015
// process { key: 'module2' }
// null { key: 'module2' }
// 3016
// process { key: 'module3' }
// null { key: 'module3' }
// 3017
// process { key: 'module4' }
// null { key: 'module4' }
// 6019