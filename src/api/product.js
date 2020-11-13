//导入axios
import axios from '@/utils/request.js';

// 导出请求
export function findAllProduct(params) {
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
    return axios.post('/product/query', obj);
}
export function saveOrUpdate(params) {
    return axios.post('/product/saveOrUpdate', params)
}
export function deleteById(params) {
    return axios.get('/product/deleteById', { params })
}
export function batchDelete(params) {
    return axios.post('/product/batchDelete', params)
}
export function findById(params) {
    return axios.get('/product/findById', { params })
}
export function findAllCategory(params) {
    return axios.get('/category/findAll', { params })
}