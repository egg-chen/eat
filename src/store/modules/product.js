// 导入请求
import { findAllProduct, saveOrUpdate, findById, findAllCategory } from '@/api/product.js'
import { Notification } from 'element-ui';
import category from './category';
//配置vuex结构
export default {
    namespaced: true,
    state: {
        totalData: {},
        productPerData: [],
        categoryData: []
    },
    getters: {
        productData: state => state.totalData.list,
        total: state => state.totalData.total,
    },
    mutations: {
        changeProductData(state, data) {
            state.totalData = data
        },
        changeProduct(state, data) {
            state.productPerData = data
        },
        changeCategoryData(state, data) {
            state.categoryData = data
        }
    },
    actions: {
        findAllProduct({ commit }, payload) {
            findAllProduct(payload).then((res) => {
                commit('changeProductData', res.data)
            })
        },
        async findById({ commit }, payload) {
            let res = await findById(payload);
            commit('changeProduct', res.data)
        },
        async findAllCategory({ commit }, payload) {
            let res = await findAllCategory(payload);
            commit('changeCategoryData', res.data)
        },
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            if (res.status === 200) {
                Notification({
                    type: 'success',
                    title: '成功',
                    message: '保存成功'
                })
                dispatch('findAllProduct', payload.queryParams)

            } else {
                Notification({
                    type: 'error',
                    title: '失败',
                    message: '保存失败'
                })
            }
        }
    }
}