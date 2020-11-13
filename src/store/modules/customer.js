// 导入api内的方法或者axios
import { findAll, saveOrUpdate, findCustomerById } from '@/api/customer.js';
import { Notification } from 'element-ui';
import { findByCustomerId as findAddressByCId } from '@/api/address.js'
import { findOrderByCustomerId } from '@/api/order.js'
//
// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  state: {
    //获取顾客信息的时候后台总数据
    totalData: {},
    //顾客地址信息
    addressData: [],
    //顾客订单信息
    orderData: [],
    // 通过id获取顾客信息
    cusdata: []
  },
  //数据处理映射
  getters: {
    //总条数
    total: state => state.totalData.total,
    // 每页的顾客信息
    customerData: state => state.totalData.list,
  },
  mutations: {
    changeTotalData(state, data) {
      state.totalData = data;
    },
    changeAddressData(state, data) {
      state.addressData = data;
    },
    changeOrderData(state, data) {
      state.orderData = data;
    },
    changePerCustomer(state, data) {
      state.cusdata = data;
    }
  },
  actions: {
    /**
     * 
     *通过顾客Id查找订单信息
     */
    async findOrderByCustomerId({ commit }, payload) {
      let res = await findOrderByCustomerId(payload);
      commit('changeOrderData', res.data);
    },
    /**
     * 通过顾客id找地址
     * 
     */
    async findAddressByCId({ commit }, payload) {
      let res = await findAddressByCId(payload);

      //保存数据到仓库
      commit('changeAddressData', res.data);

    },
    async findCustomerById({ commit }, payload) {
      let res = await findCustomerById(payload);
      commit('changePerCustomer', res.data)
    },
    /**
     * 查找顾客信息
     * 
     */
    findAll({ commit }, payload) {
      //数据处理 payload.page 10  payload.pageSize 5 res.data.total 20
      findAll(payload).then((res) => {
        //如果页码超了范围处理一下  1234  大范围
        let max = Math.ceil(res.data.total / payload.pageSize)
        if (payload.page > max) {
          payload.page = max;
          findAll(payload).then((res) => {
            commit('changeTotalData', res.data)
          })
        } else {
          commit('changeTotalData', res.data)
        }

      })
    },

    /**
     * 
     *  新增修改用户信息
     * 
     */

    async saveOrUpdate({ dispatch }, payload) {
      //接受数据，发起请求，请求成功提示用户保存成功，处理page,分发findAll动作
      let res = await saveOrUpdate(payload.form);
      if (res.status === 200) {
        Notification({
          type: 'success',
          title: '成功',
          message: '保存成功'
        });
        //查找数据  区分是新增查找还是修改查找  新增查找，找最后一页数据，修改查找，找当前页数据
        //找当前页数据
        dispatch('findAll', payload.queryParams);
        //将来调用saveOrUpdate的参数是{form:{},queryParams:queryParams}
      } else {
        Notification({
          type: 'success',
          title: '失败',
          message: '保存失败'
        })
      }
    }

  }
}