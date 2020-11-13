<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table
        size="mini"
        :data="commentData"
        stripe
        style="width: 100%"
        height="calc(100vh - 200px)"
      >
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="content" label="评论内容" width="180">
        </el-table-column>
        <el-table-column
          prop="commentTime"
          label="评论时间"
          :formatter="changeTime"
        >
        </el-table-column>
        <el-table-column prop="orderId" label="订单"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button
              v-if="scope.row.status == '审核不通过'"
              @click="topass(scope.row)"
              type="text"
              size="small"
              >通过审核</el-button
            >
            <el-button
              v-if="scope.row.status == '未审核'"
              @click="topass(scope.row)"
              type="text"
              size="small"
              >通过审核</el-button
            >
            <el-button
              v-if="scope.row.status == '审核通过'"
              @click="torefuse(scope.row)"
              type="text"
              size="small"
              >拒绝审核</el-button
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
    <!-- 顾客管理
    {{ total }}
    {{ customerData }} -->
  </div>
</template>

<script>
// 导入vuex或者axios
import { mapActions, mapGetters } from "vuex";
import {
  deleteById,
  commentRefuseExamine,
  commentExamine,
} from "@/api/comment.js";
export default {
  data() {
    return {
      //获取数据的参数
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "",
      },
    };
  },
  computed: {
    ...mapGetters("comment", ["total", "commentData"]),
  },
  methods: {
    ...mapActions("comment", ["findAll", "saveOrUpdate"]),
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
    toDelete(row) {
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
    torefuse(row) {
      this.row = { ...row };
      commentRefuseExamine({ commentid: this.row.id }).then((res) => {
        if (res.status === 200) {
          this.$notify({
            title: "成功",
            message: "拒绝成功",
            type: "success",
          });
          // var row1 = {
          //   ...row,
          //   status: "审核不通过",
          // };
          this.findAll(this.queryParams);
          // this.saveOrUpdate({ row: row1, queryParams: this.queryParams });
          // console.log(this.row, "=========----==--==");
        } else {
          this.$notify({
            title: "失败",
            message: "拒绝失败",
            type: "error",
          });
        }
      });
    },
    topass(row) {
      this.row = { ...row };
      var row1 = {
        ...row,
        status: "审核通过",
      };
      console.log(this.row, "==========");
      commentExamine({ commentid: this.row.id }).then((res) => {
        if (res.status === 200) {
          this.$notify({
            title: "成功",
            message: "通过成功",
            type: "success",
          });
          this.findAll(this.queryParams);
          // this.saveOrUpdate({ row: row1, queryParams: this.queryParams });
          // console.log(this.row, "=========----==--==");
        } else {
          this.$notify({
            title: "失败",
            message: "通过失败",
            type: "error",
          });
        }
      });
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