<template>
  <div class="main">
    <div class="top">
      <div class="title">
        <img src="" alt="" />
      </div>

      <h3>{{ cusdata.realname }}</h3>
      <span>海纳百川，有容乃大</span>
    </div>
    <span>联系方式：{{ cusdata.telephone }}</span>
    <br />
    <br />
    <span>状态：{{ cusdata.status }}</span>
    <br />
    <br />
    <span>地址：{{ cusdata.province }}{{ cusdata.city }}</span>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("customer", ["cusdata"]),
  },
  methods: {
    ...mapActions("customer", ["findCustomerById"]),
  },
  created() {
    this.findCustomerById({ id: this.$route.params.id });
    console.log(this.cusdata);
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