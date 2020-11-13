<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table
        size="mini"
        :data="waiterExamineData"
        stripe
        style="width: 100%"
        height="calc(100vh - 200px)"
      >
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="realname" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="telephone" label="手机号"> </el-table-column>
        <el-table-column prop="idCard" label="身份证号"> </el-table-column>
        <el-table-column prop="bankCard" label="银行卡号"> </el-table-column>
        <el-table-column prop="registerTime" label="注册时间">
        </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="toExamine(scope.row)" type="text" size="small"
              >审核</el-button
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
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 模态框 @close="dialogClose" -->
    <el-dialog :title="title" :visible.sync="visible">
      <el-form :model="form">
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <!-- <span  v-model="form.username"></span> -->
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="身份证号"
          prop="idCard"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="身份证正面照"
          prop="idcardPhotoPositive"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.idcardPhotoPositive"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="身份证反面照"
          prop="idcardPhotoNegative"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.idcardPhotoNegative"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="toRefuse">拒绝审核</el-button>
        <el-button type="primary" @click="toPass">审核通过</el-button>
      </div>
    </el-dialog>
    <!-- 顾客管理
    {{ total }}
    {{ customerData }} -->
  </div>
</template>

<script>
// 导入vuex或者axios
import { mapActions, mapGetters, mapState } from "vuex";
import { auditing, refusauditing } from "@/api/waiterExamine.js";
export default {
  data() {
    return {
      //获取数据的参数
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "",
      },
      formLabelWidth: "120px",
      form: {},
      visible: false,
      title: "审核员工",
      data: {},
    };
  },
  computed: {
    ...mapState("waiterExamine", ["waiterData"]),
    ...mapGetters("waiterExamine", ["total", "waiterExamineData"]),
  },
  methods: {
    ...mapActions("waiterExamine", [
      "findAll",
      "findWaiterExamine",
      "saveOrUpdate",
    ]),
    //拒绝
    toRefuse() {
      refusauditing({ id: this.form.id }).then((res) => {
        if (res.status === 200) {
          this.$notify({
            type: "success",
            title: "成功",
            message: "审核不通过",
          });
          this.visible = false;
          this.findAll(this.queryParams);
        } else {
          this.$notify({
            type: "error",
            title: "失败",
            message: "审核失败",
          });
        }
      });
    },
    //通过
    toPass() {
      auditing({ form: this.form }).then((res) => {
        if (res.status === 200) {
          this.$notify({
            type: "success",
            title: "成功",
            message: "审核通过",
          });
          this.visible = false;
          this.findAll(this.queryParams);
        } else {
          this.$notify({
            type: "error",
            title: "失败",
            message: "审核失败",
          });
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.findAll(this.queryParams);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.findAll(this.queryParams);
    },
    toExamine(row) {
      console.log(row);
      this.visible = true;
      this.form = { ...row };
      this.findWaiterExamine({ id: row.id });
    },
  },
  created() {
    this.findAll(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>