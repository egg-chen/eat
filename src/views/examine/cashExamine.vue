<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table
        size="mini"
        :data="cashExamineData"
        stripe
        style="width: 100%"
        height="calc(100vh - 200px)"
      >
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="money" label="金额" width="180">
        </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="userId" label="员工Id"> </el-table-column>
        <el-table-column prop="transferAccounts" label="凭证">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-if="scope.row.transferAccounts != ''"
              @click="toLook(scope.row)"
              >查看凭证</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="scope.row.transferAccounts == ''"
              @click="toUpload(scope.row)"
              >上传凭证</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-if="scope.row.transferAccounts != ''"
              @click="toPasOnce(scope.row)"
              >已审核</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="scope.row.transferAccounts == ''"
              @click="toPass(scope.row)"
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
      <el-button type="primary" @click="toUploadImage">点击上传</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="visible1">
      <div>
        <div class="block">
          <span class="demonstration">默认</span>
          <el-image :src="src"></el-image>
        </div>
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
export default {
  data() {
    return {
      //获取数据的参数
      queryParams: {
        page: 1,
        pageSize: 10,
        transferAccounts: "",
      },
      title: "上传凭证",
      hasVoucher: true,
      pass: true,
      visible: false,
      visible1: false,
      src: "",
    };
  },
  computed: {
    ...mapState("cashExamine", ["totalData"]),
    ...mapGetters("cashExamine", ["total", "cashExamineData"]),
  },
  methods: {
    ...mapActions("cashExamine", ["findAll"]),
    toSave() {},
    toUploadImage() {},
    toLook(row) {
      this.visible1 = true;
      this.title = "凭证";
    },
    toUpload(row) {
      this.visible = true;
    },
    toPasOnce(row) {},
    toPass(row) {},
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.findAll(this.queryParams);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.findAll(this.queryParams);
    },
  },
  created() {
    console.log(this.totalData, "/////////////");
    this.findAll(this.queryParams);
    //   let data = this.cashExamineData.map(function (item) {
    //     return item;
    //   });
    //   console.log(data, "====++++++");
    //   for (let index = 0; index < data.length; index++) {
    //     if (data[index] == "") {
    //       this.hasVoucher = false;
    //       this.pass = false;
    //     } else {
    //       this.hasVoucher = true;
    //       this.pass = true;
    //     }
    //   }
    // if (data != "") {
    //   this.hasVoucher = true;
    //   this.pass = true;
    // } else {
    //   this.hasVoucher = false;
    //   this.pass = false;
    // }
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>