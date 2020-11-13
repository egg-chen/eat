<template>
  <div>
    <div>
      <el-table
        size="mini"
        :data="orderData3"
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
            <el-button @click="toSendOrder(scope.row)" type="text" size="small"
              >派单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog @close="dialogClose" :title="title" :visible.sync="visible">
      <el-radio-group v-model="waiter" ref="ruleForm">
        <el-radio
          :label="item.id"
          v-for="item in allWaiter"
          :value="item.id"
          :key="item.id"
          >{{ item.username }}</el-radio
        >
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { sendOrder } from "@/api/order.js";
export default {
  data() {
    return {
      //获取数据的参数
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "待派单",
      },
      visible: false,
      waiter: "",
      title: "派单",
      id: "",
    };
  },
  computed: {
    ...mapState("order", ["allWaiter"]),
    ...mapGetters("order", ["total3", "orderData3"]),
  },
  methods: {
    ...mapActions("order", ["findSendOrderAll", "findAllWaiter"]),
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
    toSendOrder(row) {
      this.row = { ...row };
      this.visible = true;
      this.radio = {};
      this.id = this.row.id;
    },
    toSave() {
      sendOrder({ orderId: this.id, waiterId: this.waiter }).then((res) => {
        if (res.status == "200") {
          this.$notify({
            title: "成功",
            message: "派单成功",
            type: "success",
          });
          this.visible = false;
          this.findSendOrderAll(this.queryParams);
          this.waiter = "";
        } else {
          this.$notify({
            title: "失败",
            message: "派单失败",
            type: "error",
          });
        }
      });
    },
    dialogClose() {
      this.waiter = "";
      // this.$refs["ruleForm"].resetFields();
      // console.log(this, "==-__=++++");
    },
  },
  created() {
    this.findSendOrderAll(this.queryParams);
    this.findAllWaiter();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>