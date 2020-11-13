<template>
  <div>
    <!-- 表格  -->
    <div class="tables">
      <el-table
        border
        height="calc(100vh - 350px)"
        size="mini"
        :data="tempData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="订单编号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="orderTime"
          label="下单时间"
          width="180"
        ></el-table-column>
        <el-table-column prop="total" label="总价"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="customerId" label="顾客Id"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="toOrderDetail(scope.row)"
              type="text"
              size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination
        :current-page.sync="page"
        :page-sizes="[1, 2, 3, 5, 10, 15, 20]"
        :page-size.sync="pageSize"
        layout="total,sizes, prev, pager, next"
        :total="orderData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrderDetail from "./orderDetail.vue";
export default {
  components: {
    OrderDetail,
  },
  data() {
    return {
      customerId: this.$route.params.id,
      page: 1,
      pageSize: 3,
    };
  },
  computed: {
    ...mapState("customer", ["orderData"]),
    tempData() {
      return this.orderData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },
  methods: {
    ...mapActions("customer", ["findOrderByCustomerId"]),
    toOrderDetail(row) {},
  },
  created() {
    this.findOrderByCustomerId({ customerId: this.$route.params.id });
    // console.log(this.$route.params.id, "------");
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>