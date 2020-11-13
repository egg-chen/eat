<template>
  <div id="myChart" class="charts-box" style="width: 100%; height: 420px" />
</template>
<script>
export default {
  name: "Home",
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // myChart.showLoading(); // 开启 loading 效果
      // setTimeout(() => {
      //   myChart.hideLoading(); // 隐藏 loading 效果
      // }, 2000);
      // 绘制图表
      myChart.setOption({
        title: {
          left: "center",
          align: "right",
          text: "一周外卖销售量",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: 10,
          data: ["销售量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
          splitNumber: 8,
          minInterval: 100,
          boundaryGap: ["10%", "10%"],
          name: "销售量/单",
          // data: [100, 200, 300, 400, 500, 600, 700, 800],
        },
        series: [
          // {
          //   name: "期待值",
          //   type: "line",
          //   stack: "总量",
          //   data: [300, 350, 400, 500, 550, 680, 750],
          // },
          {
            name: "销售量",
            type: "line",
            stack: "总量",
            data: [500, 550, 490, 450, 700, 850, 880],
          },
        ],
      });
    },
  },
};
</script>