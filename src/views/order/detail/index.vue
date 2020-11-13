<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>
    <div class="main">
      <span>订单编号：{{ orderPerData.id }}</span>
      <br />
      <br />
      <span>下单时间：{{ changeTime(orderPerData.orderTime) }}</span>
      <br />
      <br />
      <span>订单状态：{{ orderPerData.status }}</span>
      <br />
      <br />
      <span>员工编号：{{ orderPerData.waiterId }}</span>
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
    ...mapState("order", ["orderPerData"]),
    ...mapGetters("order", ["customer"]),
  },
  methods: {
    ...mapActions("order", ["findById"]),
    changeTime(data) {
      // let date = new Date(parseInt(row.commentTime));
      // return date.toLocaleString();
      if (data == null) {
        return null;
      }
      let dt = new Date(parseInt(data));
      //   let dt2 = dt.toLocaleString();
      //   return dt2;
      return (
        dt.getFullYear() +
        "-" +
        (dt.getMonth() + 1) +
        "-" +
        dt.getDate() +
        " " +
        dt.getHours() +
        ":" +
        dt.getMinutes()
      );
    },
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.findById({ id: this.$route.params.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>