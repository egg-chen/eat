<template>
  <div>
    <!-- 表格 -->
    <div class="tables">
      <el-table
        border
        height="calc(100vh - 350px)"
        size="mini"
        :data="tempData"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="180"
        ></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="area" label="区县"></el-table-column>
        <el-table-column prop="address" label="街道"></el-table-column>
        <el-table-column prop="telephone" label="联系电话"></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination
        background
        :current-page.sync="page"
        :page-sizes="[1, 2, 3, 5, 10, 15, 20]"
        :page-size.sync="pageSize"
        layout="total,sizes, prev, pager, next"
        :total="addressData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
      page: 1,
      pageSize: 2,
    };
  },
  computed: {
    ...mapState("customer", ["addressData"]),
    tempData() {
      return this.addressData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },
  methods: {
    ...mapActions("customer", ["findAddressByCId"]),
  },
  created() {
    // console.log(this.$route.params.id, "------");
    this.findAddressByCId({ id: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>