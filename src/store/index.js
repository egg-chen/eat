import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

// 导入customer
import customer from './modules/customer'
//导入product
import product from './modules/product'
import category from './modules/category'
import waiter from './modules/waiter'
import comment from './modules/comment'
import waiterExamine from './modules/waiterExamine'
import order from './modules/order'
import cashExamine from './modules/cashExamine'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    // customer模块
    customer,
    //product模块
    product,
    category,
    waiter,
    comment,
    waiterExamine,
    order,
    cashExamine
  },
  getters
})

export default store
