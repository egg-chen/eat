// 导入api内的方法或者axios
import { findAll, saveOrUpdate, findOrderByWaiterId, detailsShou, findWaiterById, findOrderById } from '@/api/waiter.js';
import { Notification } from 'element-ui';
// 配置Vuex结构
export default {
    // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
    namespaced: true,

    state: {
        //获取顾客信息的时候后台总数据
        totalData: {},
        //获取订单信息的时候给后台数据
        orderData: [],
        moneyData: [],
        // 通过id获取的员工的基本信息
        waiterPerData: [],
        orderPerDate: [],
        customer: [],
    },
    //数据处理映射
    getters: {
        //总条数
        total: state => state.totalData.total,
        // 每页的顾客信息
        waiterData: state => state.totalData.list,
        customer: state => state.orderPerDate.customer,
    },
    mutations: {
        changeTotalData(state, data) {
            state.totalData = data;
        },
        changeOrderData(state, data) {
            state.orderData = data;
        },
        changeMoneyData(state, data) {
            state.moneyData = data;
        },
        changeWaiterPerData(state, data) {
            state.waiterPerData = data;
        },
        changeOrderPerDate(state, data) {
            state.orderPerDate = data
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
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            if (res.status === 200) {
                Notification({
                    type: 'success',
                    title: '成功',
                    message: '保存成功'
                });
                dispatch('findAll', payload.queryParams);
            } else {
                Notification({
                    type: 'error',
                    title: '失败',
                    message: '保存失败'
                });
            }
        },
        async findOrderByWaiterId({ commit }, payload) {
            let res = await findOrderByWaiterId(payload);
            commit('changeOrderData', res.data);
        },
        async findWaiterById({ commit }, payload) {
            let res = await findWaiterById(payload);
            commit('changeWaiterPerData', res.data);
        },
        async detailsShou({ commit }, payload) {
            let res = await detailsShou(payload);
            commit('changeMoneyData', res.data);
        },
        findOrderById({ commit }, payload) {
            findOrderById(payload).then((res) => {
                commit('changeOrderPerDate', res.data)
            })
        }

    }
}