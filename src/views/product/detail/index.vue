<template>
  <div class="main">
    <el-button type="text" @click="toBack">返回</el-button>
    <br />
    <br />
    <span>产品名称：{{ productPerData.name }}</span>
    <br />
    <br />
    <span>产品价格：{{ productPerData.price }}</span>
    <br />
    <br />
    <span>产品描述：{{ productPerData.description }}</span>
    <br />
    <br />
    <span>产品主图:{{ productPerData.photo }}</span>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: { ...mapState("product", ["productPerData"]) },
  methods: {
    ...mapActions("product", ["findById"]),
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.findById({ id: this.$route.params.id });
  },
  mounted() {},
};
</script>
<style scoped>
.main {
  margin-left: 20px;
}
</style>