<template>
  <div>
    <div class="options">
      <el-button size="mini" type="primary" @click="toAdd">添加</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        size="mini"
        :data="waiterData"
        stripe
        style="width: 100%"
        height="calc(100vh - 200px)"
      >
        <el-table-column prop="id" label="编号" width="100"> </el-table-column>
        <el-table-column prop="realname" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="telephone" label="手机号"> </el-table-column>
        <el-table-column prop="idCard" label="身份证号"> </el-table-column>
        <el-table-column prop="bankCard" label="银行卡号"> </el-table-column>
        <el-table-column
          prop="registerTime"
          label="注册时间"
          :formatter="changeTime"
        >
        </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
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
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 模态框 @close="dialogClose" -->
    <el-dialog @close="dialogClose" :title="title" :visible.sync="visible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username" label-width="100px">
          <el-input
            v-model="form.username"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname" label-width="100px">
          <el-input
            v-model="form.realname"
            autocomplete="off"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone" label-width="100px">
          <el-input
            v-model="form.telephone"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="身份证号"
          prop="idCard"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.idCard"
            autocomplete="off"
            placeholder="请输入身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="银行卡"
          prop="bankCard"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.bankCard"
            autocomplete="off"
            placeholder="请输入银行卡号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 顾客管理
    {{ total }}
    {{ customerData }} -->
  </div>
</template>

<script>
// 导入vuex或者axios
import { mapActions, mapGetters } from "vuex";
import { deleteById } from "@/api/waiter.js";
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
      title: "添加员工信息",
      visible: false,
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],

        telephone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        bankCard: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("waiter", ["total", "waiterData"]),
  },
  methods: {
    ...mapActions("waiter", ["findAll", "saveOrUpdate"]),
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
    dialogClose() {
      this.$refs["ruleForm"].resetFields();
    },
    //保存按钮
    toSave() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.saveOrUpdate({
            form: this.form,
            queryParams: this.queryParams,
          }).then(() => {
            this.visible = false;
          });
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加按钮
    toAdd() {
      this.visible = true;
      this.form = {};
      this.title = "添加员工信息";
    },
    //页码发生变化
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryParams.page = 1;
      this.queryParams.pageSize = val;
      this.findAll(this.queryParams);
    },
    //当前页信息
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.findAll(this.queryParams);
    },
    toDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteById({ id: row.id }).then((res) => {
            if (res.status === 200) {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
              });
              this.findAll(this.queryParams);
            } else {
              this.$notify({
                title: "失败",
                message: "删除失败",
                type: "success",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toEdit(row) {
      console.log(row);
      this.title = "修改员工信息";
      this.visible = true;
      this.form = { ...row };
    },
    toDetail(row) {
      console.log(row);
      this.$router.push(`/waiterDetail/${row.id}/index`);
    },
  },
  created() {
    this.findAll(this.queryParams);
  },
  mounted() {},
};
</script>
<style  scoped>
.options > * {
  float: left;
  margin-left: 10px;
}
.options {
  height: 40px;
}
.options div {
  width: 200px;
}
.page {
  margin-top: 10px;
}
</style>