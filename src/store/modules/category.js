// 导入请求
import { findAllCategory, saveOrUpdate } from '@/api/category.js'
import { Notification } from 'element-ui';
//配置vuex结构
export default {
    namespaced: true,
    state: {
        totalData: {}
    },
    getters: {
        categoryData: state => state.totalData.list,
        total: state => state.totalData.total,
    },
    mutations: {
        changeCategoryData(state, data) {
            state.totalData = data
        }
    },
    actions: {
        findAllCategory({ commit }, payload) {
            findAllCategory(payload).then((res) => {
                commit('changeCategoryData', res.data)
            })
        },
        saveOrUpdate({ dispatch }, payload) {
            saveOrUpdate(payload.form).then((res) => {
                if (res.status === 200) {
                    Notification({
                        type: 'success',
                        title: '成功',
                        message: '保存成功'
                    });
                    dispatch('findAllCategory', payload.queryParams);
                } else {
                    Notification({
                        type: 'error',
                        title: '失败',
                        message: '保存失败'
                    });
                }
            })
        }
    }
}