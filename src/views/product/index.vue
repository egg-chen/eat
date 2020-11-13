<template>
  <div>
    <!-- 产品管理 -->
    <div class="options">
      <el-button size="mini" type="primary" @click="toAdd">添加</el-button>
      <el-input
        size="mini"
        v-model="queryParams.name"
        placeholder="请输入产品名称"
      ></el-input>
      <el-button size="mini" type="primary" @click="toSearch">查询</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="toBatchDelete"
        :disabled="isDisabled"
        >批量删除</el-button
      >
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        border
        height="calc(100vh - 200px)"
        size="mini"
        :data="productData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          align="center"
          type="index"
          :index="indexMethod"
          width="100"
          label="编号"
        >
        </el-table-column>
        <!-- <el-table-column prop="id" label="编号" width="180"> </el-table-column> -->
        <el-table-column prop="name" label="产品名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="description" label="产品描述"> </el-table-column>
        <el-table-column prop="categoryId" label="所属分类"> </el-table-column>
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
    <!-- 模态框 -->
    <el-dialog @close="dialogClose" :title="title" :visible.sync="visible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="name"
          label="产品名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入产品名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="price" label="价格" :label-width="formLabelWidth">
          <el-input
            v-model="form.price"
            autocomplete="off"
            placeholder="请输入产品价格"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="categoryId"
          label="所属分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.categoryId" placeholder="请选择所属栏目">
            <el-option
              v-for="(item, index) in categoryData"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="description"
          label="介绍"
          :label-width="formLabelWidth"
        >
          <el-input
            autocomplete="off"
            type="textarea"
            :rows="3"
            placeholder="请输入产品介绍"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { deleteById, batchDelete } from "@/api/product.js";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        // status: "",
      },
      visible: false,
      formLabelWidth: "120px",
      form: {},
      isDisabled: true,
      title: "添加产品信息",
      rules: {
        name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入产品价格", trigger: "blur" }],
        description: [
          { required: true, message: "请输入产品介绍", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "请选择所属栏目", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("product", ["productData", "total"]),
    ...mapState("product", ["categoryData"]),
  },
  methods: {
    ...mapActions("product", [
      "findAllProduct",
      "saveOrUpdate",
      "findAllCategory",
    ]),
    changeCategoryData(row) {
      console.log(row.categoryId);
      return this.categoryData.forEach((item) => {
        if ((row.categoryId = item.id)) {
          return item.name;
        }
      });
    },
    //批量删除产品
    toBatchDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(11111);
          //发请求删除
          batchDelete({ ids: this.ids.join() })
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
                this.findAllProduct(this.queryParams);
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    dialogClose() {
      //重置表单
      this.$refs["ruleForm"].resetFields();
    },
    //保存
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
    //添加
    toAdd() {
      this.title = "添加产品信息";
      this.form = {};
      this.visible = true;
    },
    //查询按钮
    toSearch() {
      this.queryParams.page = 1;
      this.findAllProduct(this.queryParams);
    },
    //表格多选事件发生变化处理函数
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      //val是一个数组，内部是选中的对象
      // console.log(val);
      this.ids = val.map((item) => item.id);
      if (this.ids.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    //自定义表格索引
    indexMethod(index) {
      //（页码—1）*条数+索引+1
      let { page, pageSize } = this.queryParams;
      return (page - 1) * pageSize + index + 1;
      // return index * 2;
    },
    //每页条数发生变化事件处理函数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      //改数据模型中的pageSize，设置page为1，发起请求
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      //发起请求
      this.findAllProduct(this.queryParams);
    },
    //页码发生变化的事件处理程序
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //发起请求
      //修改数据模型中的数据
      this.queryParams.page = val;
      this.findAllProduct(this.queryParams);
    },
    toDelete(row) {
      // console.log(row, "--");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(11111);
          //发请求删除
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
                this.findAllProduct(this.queryParams);
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toEdit(row) {
      // console.l  og(row);
      this.title = "修改产品信息";
      this.visible = true;
      this.form = { ...row };
    },
    toDetail(row) {
      console.log(row);
      this.$router.push(`/productDetail/${row.id}/index`);
    },
  },
  created() {
    this.findAllProduct(this.queryParams);
    this.findAllCategory();
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