<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info"><Info></Info></el-tab-pane>
      <el-tab-pane label="订单信息" name="order"><Order></Order></el-tab-pane>
      <!-- :lazy="true" 懒加载 -->
      <el-tab-pane :lazy="true" label="收益信息" name="money"
        ><Money></Money
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Info from "./info.vue";
import Money from "./money.vue";
import Order from "./order2.vue";
export default {
  components: {
    Info,
    Order,
    Money,
  },
  data() {
    return {
      activeName: "info",
    };
  },
  computed: {},
  methods: {
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    console.log(this.$route.params.id);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>