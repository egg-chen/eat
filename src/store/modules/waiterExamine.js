// 导入api内的方法或者axios
import { findAll, findWaiterExamine, auditing, refusauditing, saveOrUpdate } from '@/api/waiterExamine.js';
import { Notification } from 'element-ui';
// 配置Vuex结构
export default {
    // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
    namespaced: true,

    state: {
        //获取顾客信息的时候后台总数据
        totalData: {},
        //员工审核信息
        waiterData: {}

    },
    //数据处理映射
    getters: {
        //总条数
        total: state => state.totalData.total,
        // 每页的顾客信息
        waiterExamineData: state => state.totalData.list,
    },
    mutations: {
        changeTotalData(state, data) {
            state.totalData = data;
        },
        changeWaiterData(state, data) {
            state.waiterData = data;
        }
    },
    actions: {
        /**
         * 查找顾客信息
         * 
         */
        findAll({ commit }, payload) {
            findAll(payload).then((res) => {
                commit('changeTotalData', res.data)
            })
        },
        findWaiterExamine({ commit }, payload) {
            findWaiterExamine(payload).then((res) => {
                commit('changeWaiterData', res.data)
            })
        },
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            if (res.status === 200) {
                dispatch('findAll', payload.queryParams)
            }
        },

    }
}