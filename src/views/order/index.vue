<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane :lazy="true" label="所有订单" name="allOrder"
        ><AllOrder></AllOrder
      ></el-tab-pane>
      <el-tab-pane :lazy="true" label="待支付" name="noPay1"
        ><NoPay></NoPay
      ></el-tab-pane>
      <el-tab-pane :lazy="true" label="待派单" name="toSendOrder"
        ><ToSendOrder></ToSendOrder
      ></el-tab-pane>
      <!-- :lazy="true" 懒加载 -->
      <el-tab-pane :lazy="true" label="待接单" name="toGetOrder"
        ><ToGetOrder></ToGetOrder
      ></el-tab-pane>
      <el-tab-pane :lazy="true" label="待服务" name="toServe"
        ><ToServe></ToServe
      ></el-tab-pane>
      <el-tab-pane :lazy="true" label="待确认" name="toSuer"
        ><ToSuer></ToSuer
      ></el-tab-pane>
      <el-tab-pane :lazy="true" label="已完成" name="complete"
        ><Complete></Complete
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import AllOrder from "./allOrder.vue";
import ToSendOrder from "./toSendOrder.vue";
import ToGetOrder from "./toGetOrder.vue";
import ToServe from "./toServe.vue";
import ToSuer from "./toSuer.vue";
import Complete from "./complete.vue";
import NoPay from "./noPay1.vue";
export default {
  components: {
    AllOrder,
    ToSendOrder,
    ToGetOrder,
    ToServe,
    ToSuer,
    Complete,
    NoPay,
  },
  data() {
    return {
      activeName: "allOrder",
    };
  },
  computed: {},
  methods: {
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    console.log(this.activeName, "========-----+++");
  },
  mounted() {},
};
</script>
    <style lang="less" scoped>
</style>
    