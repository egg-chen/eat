// 导入api内的方法或者axios
import { findAll, findById, findAllWaiter, findOrderByCustomerId, sendOrder, getOrderLinesByOrderId } from '@/api/order.js';
// 配置Vuex结构
export default {
    // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
    namespaced: true,

    state: {
        //获取顾客信息的时候后台总数据
        totalData: {},
        //获取订单待支付的时候后台总数据
        payData: {},
        //获取订单待派单的时候后台总数据
        sendOrderData: {},
        //获取订单待接单的时候后台总数据
        getOrderData: {},
        //获取订单待服务的时候后台总数据
        toServeData: [],
        //获取订单待确认的时候后台总数据
        toSuerData: {},
        //获取订单已完成的时候后台总数据
        toCompleteData: {},
        orderPerData: [],
        customer: [],
        allWaiter: [],
        sendOrderData: {},
    },
    //数据处理映射
    getters: {
        //总条数
        total: state => state.totalData.total,
        // 每页的订单信息
        orderData: state => state.totalData.list,
        total2: state => state.payData.total,
        // 每页的订单信息
        orderData2: state => state.payData.list,
        total2: state => state.payData.total,
        // 每页的订单信息
        orderData2: state => state.payData.list,
        total3: state => state.sendOrderData.total,
        // 每页的订单信息
        orderData3: state => state.sendOrderData.list,
        total4: state => state.getOrderData.total,
        // 每页的订单信息
        orderData4: state => state.getOrderData.list,
        // 每页的订单信息
        total6: state => state.toSuerData.total,
        // 每页的订单信息
        orderData6: state => state.toSuerData.list,
        total7: state => state.toCompleteData.total,
        // 每页的订单信息
        orderData7: state => state.toCompleteData.list,
        customer: state => state.orderPerData.customer
    },
    mutations: {
        changeTotalData(state, data) {
            state.totalData = data;
        },
        changePayData(state, data) {
            state.payData = data;
        },
        chengeSendOrderData(state, data) {
            state.sendOrderData = data;
        },
        chengeGetOrderData(state, data) {
            state.getOrderData = data;
        },
        chengeToServeData(state, data) {
            state.toServeData = data;
        },
        chengeToSuerData(state, data) {
            state.toSuerData = data;
        },
        chengeToCompleteData(state, data) {
            state.toCompleteData = data;
        },
        chengeOrderPerData(state, data) {
            state.orderPerData = data;
        },
        changeAllWaiter(state, data) {
            state.allWaiter = data
        },
    },
    actions: {
        async findAllWaiter({ commit }, payload) {
            let res = await findAllWaiter(payload);
            commit('changeAllWaiter', res.data);
        },
        async findById({ commit }, payload) {
            let res = await findById(payload);
            commit('chengeOrderPerData', res.data)
        },
        /**
         * 查找顾客信息
         * 
         */
        findAll({ commit }, payload) {
            findAll(payload).then((res) => {
                commit('changeTotalData', res.data)
            })
        },
        findPayOrderAll({ commit }, payload) {
            findAll(payload).then((res) => {
                commit('changePayData', res.data)
            })
        },
        findSendOrderAll({ commit }, payload) {
            findAll(payload).then((res) => {
                commit('chengeSendOrderData', res.data)
            })
        },
        findGetOrderData({ commit }, payload) {
            findAll(payload).then((res) => {
                commit('chengeGetOrderData', res.data)
            })
        },
        findToServeData({ commit }, payload) {
            findAll(payload).then((res) => {
                commit('chengeToServeData', res.data)
            })
        },
        findToSuerData({ commit }, payload) {
            findAll(payload).then((res) => {
                commit('chengeToSuerData', res.data)
            })
        },
        findToCompleteData({ commit }, payload) {
            findAll(payload).then((res) => {
                commit('chengeToCompleteData', res.data)
            })
        },
        findOrderByCustomerId({ commit }, payload) {
            findOrderByCustomerId(payload).then((res) => {
                commit('chengeToServeData', res.data)
            })
        }

    }
}