<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>
    <div class="main">
      <span>订单编号：{{ orderPerDate.id }}</span>
      <br />
      <br />
      <span>下单时间：{{ orderPerDate.orderTime }}</span>
      <br />
      <br />
      <span>订单状态：{{ orderPerDate.status }}</span>
      <br />
      <br />
      <span>员工编号：{{ orderPerDate.waiterId }}</span>
      <br />
      <br />
      <span>顾客：{{ customer.realname }}</span>
      <br />
      <br />
      <span>顾客手机号：{{ customer.telephone }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("waiter", ["orderPerDate"]),
    ...mapGetters("waiter", ["customer"]),
  },
  methods: {
    ...mapActions("waiter", ["findOrderById"]),
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.findOrderById({ id: this.$route.params.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>