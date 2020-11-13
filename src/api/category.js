//导入axios
import axios from '@/utils/request.js';

// 导出请求
export function findAllCategory(params) {
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
    return axios.post('/category/query', obj);
}
export function saveOrUpdate(params) {
    return axios.post('/category/saveOrUpdate', params)
}
export function deleteById(params) {
    return axios.get('/category/deleteById', { params })
}