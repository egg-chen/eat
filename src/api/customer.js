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
    for (let key in obj) {

        // 隐式数据类型转换，
        if (obj[key] === 0) {
            continue;
        }
        if (!obj[key]) {
            delete obj[key]
        }
    }
    //delete obj.name
    return axios.post('/customer/query', obj)
}
//params为新增修改时传给后台的数据   form
export function saveOrUpdate(params) {
    return axios.post('/customer/saveOrUpdate', params)
}
export function deleteById(params) {
    return axios.get('/customer/deleteById', { params })
}
//批量删除顾客
export function batchDelete(params) {
    return axios.post('/customer/batchDelete', params)
}
export function findCustomerById(params) {
    return axios.get('/customer/findCustomerById', { params })
}