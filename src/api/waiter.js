// 在api中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/utils/request.js'
/**
 * 查找所有的顾客信息
 * @param Object params
 * @returns Promise对象
 */
export function findAll(params) {
    /*
    if(!params.status){
        delete params.status;
    }*/
    //遍历对象  for-in
    //Object.keys()
    //Object.values()
    //Object.entries()
    let obj = { ...params };
    obj.page--;
    for (let key in params) {
        // 隐式数据类型转换，
        if (params[key] === 0) {
            continue;
        }
        if (!params[key]) {
            delete params[key]
        }
    }
    //delete obj.name
    return axios.post('/waiter/query', obj)
}
export function saveOrUpdate(params) {
    return axios.post('/waiter/saveOrUpdate', params)
}
export function deleteById(params) {
    return axios.get('/waiter/deleteById', { params })
}
export function findOrderByWaiterId(params) {
    return axios.get('/order/query', { params })
}
export function detailsShou(params) {
    return axios.get('/waiter/detailsShou', { params })
}
export function findWaiterById(params) {
    return axios.get('/waiter/findWaiterById', { params })
}
export function findOrderById(params) {
    return axios.get('/order/findById', { params })
}