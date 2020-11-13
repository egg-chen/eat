<template>
  <div>
    <!-- 表格 -->
    <div class="tables">
      <el-table
        border
        height="calc(100vh - 300px)"
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
          prop="money"
          label="金额"
          width="180"
        ></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="transferAccounts" label="凭证"></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination
        :current-page.sync="page"
        :page-sizes="[1, 2, 3, 5, 10, 15, 20]"
        :page-size.sync="pageSize"
        layout="total,sizes, prev, pager, next"
        :total="moneyData.length"
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
      pageSize: 5,
    };
  },
  computed: {
    ...mapState("waiter", ["moneyData"]),
    tempData() {
      return this.moneyData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },
  methods: { ...mapActions("waiter", ["detailsShou"]) },
  created() {
    this.detailsShou({ id: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>