// 导入api内的方法或者axios
import { findAll } from '@/api/cashExamine.js';
// 配置Vuex结构
export default {
    // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
    namespaced: true,

    state: {
        //获取顾客信息的时候后台总数据
        totalData: {}
    },
    //数据处理映射
    getters: {
        //总条数
        total: state => state.totalData.total,
        // 每页的顾客信息
        cashExamineData: state => state.totalData.list,

    },
    mutations: {
        changeTotalData(state, data) {
            state.totalData = data;
        }
    },
    actions: {
        /**
         * 查找顾客信息
         * 
         */
        async findAll({ commit }, payload) {
            let res = await findAll(payload);
            commit('changeTotalData', res.data)
        }

    }
}