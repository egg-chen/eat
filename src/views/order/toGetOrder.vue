<template>
  <div>
    <div>
      <el-table
        size="mini"
        :data="orderData4"
        stripe
        style="width: 100%"
        height="calc(100vh - 300px)"
      >
        <el-table-column prop="id" label="订单编号" width="180">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="下单时间"
          width="180"
          :formatter="changeTime"
        >
        </el-table-column>
        <el-table-column prop="total" label="总价"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="customerId" label="顾客Id"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParams.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="total,sizes, prev, pager, next"
        :total="total4"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { takeOrder } from "@/api/order.js";
export default {
  data() {
    return {
      //获取数据的参数
      queryParams: {
        page: 0,
        pageSize: 10,
        status: "待接单",
      },
    };
  },
  computed: {
    ...mapGetters("order", ["total4", "orderData4"]),
  },
  methods: {
    ...mapActions("order", ["findGetOrderData"]),
    changeTime(row, column) {
      // let date = new Date(parseInt(row.commentTime));
      // return date.toLocaleString();
      let data = row[column.property];
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toDetail(row) {
      console.log(row);
      this.$router.push(`/orderDetail/${row.id}/index`);
    },
  },
  created() {
    this.findGetOrderData(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>