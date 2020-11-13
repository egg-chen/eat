<template>
  <div class="main">
    <div class="top">
      <div class="title">
        <img src="" alt="" />
      </div>

      <h3>{{ waiterPerData.realname }}</h3>
      <span>海纳百川，有容乃大</span>
    </div>
    <span>联系方式：{{ waiterPerData.telephone }}</span>
    <br />
    <br />
    <span>状态：{{ waiterPerData.status }}</span>
    <br />
    <br />
    <span>地址：{{ waiterPerData.province }}{{ waiterPerData.city }}</span>
  </div>
</template>


<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: { ...mapState("waiter", ["waiterPerData"]) },
  methods: { ...mapActions("waiter", ["findWaiterById"]) },
  created() {
    this.findWaiterById({ id: this.$route.params.id });
    console.log(this.waiterPerData, "=========");
  },
  mounted() {},
};
</script>
<style  scoped>
.top {
  margin: 50px 200px;
}
.top h3 {
  margin-left: 43px;
}
.title {
  width: 150px;
  height: 150px;
  background-color: gray;
  border-radius: 50%;
}
.main {
  margin-left: 20px;
}
</style>