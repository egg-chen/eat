<template>
  <div>
    <!-- 头部按钮 -->
    <div class="options">
      <el-button size="mini" type="primary" @click="toAdd">添加</el-button>
      <el-input
        size="mini"
        v-model="queryParams.name"
        placeholder="请输入栏目名称"
      ></el-input>
      <el-button size="mini" type="primary" @click="toSearch">查询</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        border
        size="mini"
        :data="categoryData"
        stripe
        style="width: 100%"
        height="calc(100vh - 200px)"
      >
        <!-- <el-table-column prop="id" label="编号" width="180"> </el-table-column> -->
        <el-table-column
          align="center"
          type="index"
          :index="indexMethod"
          width="100"
          label="编号"
        >
        </el-table-column>
        <el-table-column prop="name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="num" label="序号"> </el-table-column>
        <el-table-column prop="parentId" label="分类"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
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
    <!-- 模态框 -->
    <el-dialog @close="dialogClose" :title="title" :visible.sync="visible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          label="栏目名称"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入栏目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="num" :label-width="formLabelWidth">
          <el-input
            v-model="form.num"
            autocomplete="off"
            placeholder="请输入序号"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="所属栏目"
          prop="parentId"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.parentId"
            placeholder="请选择所属栏目"
            @change="changecategoryData"
          >
            <el-option
              v-for="(item, index) in categoryData"
              :key="index"
              :label="item.parentId"
              :value="item.parentId"
            ></el-option>
          </el-select>
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
import { deleteById } from "@/api/category.js";
export default {
  data() {
    return {
      //获取数据的参数
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "",
      },
      form: {},
      visible: false,
      title: "添加栏目信息",
      formLabelWidth: "120px",
      rules: {
        name: [{ required: true, message: "请输入栏目名称", trigger: "blur" }],
        num: [{ required: true, message: "请输入序号", trigger: "blur" }],
        parentId: [
          { required: true, message: "请输入所属栏目", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("category", ["total", "categoryData"]),
  },
  methods: {
    ...mapActions("category", ["findAllCategory", "saveOrUpdate"]),
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
    //重置表单
    dialogClose() {
      this.$refs["ruleForm"].resetFields();
    },
    toAdd() {
      this.visible = true;
      this.title = "添加栏目信息";
      this.form = {};
    },
    toSearch() {
      this.queryParams.page = 1;
      // console.log(this.queryParams);

      this.findAllCategory(this.queryParams);
      // console.log(arr);
      // console.log(111);
    },
    //自定义表格索引
    indexMethod(index) {
      //（页码—1）*条数+索引+1
      let { page, pageSize } = this.queryParams;
      return (page - 1) * pageSize + index + 1;
      // return index * 2;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.findAllCategory(this.queryParams);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.findAllCategory(this.queryParams);
    },
    toDelete(row) {
      // console.log(row);
      // console.log(row.id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //发请求删除
        //数组转字符串传参过去  [1,2,3]--->1,2,3 join(),toString()
        deleteById({ id: row.id })
          .then((res) => {
            if (res.status === 200) {
              //提示删除成功，并且刷新数据
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
              });
              //防止删除了最后一页只有一条数据时没有最后一页
              // this.queryParams.page = 1;
              this.findAllCategory(this.queryParams);
            } else {
              this.$notify({
                title: "失败",
                message: "删除失败",
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "失败",
              message: "删除失败",
              type: "error",
            });
          });
        // this.$message({
        //   type: "success",
        //   message: "删除成功!",
        // });
      });
    },
    toEdit(row) {
      console.log(row);
      this.visible = true;
      this.title = "修改栏目信息";
      this.form = { ...row };
    },
    changecategoryData() {},
  },
  created() {
    this.findAllCategory(this.queryParams);
  },
  mounted() {},
};
</script>
<style scoped>
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