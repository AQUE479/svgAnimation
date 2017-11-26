<template>
  <div id="container">
    <div id="tip">
    </div>
  </div>
</template>
<script>
import graph from "./js/graphs.js";
export default {
  name: "container",
  created() {},
  mounted() {
    this.show();
  },
  data() {
    return {
    };
  },
  methods: {
    show() {
      // 初始化属性数据和图形
      let mygraph = graph.init();
      // 展示图形动画
      mygraph.showGraph();
      // 按下按键获取数据
      document.onkeydown = event => {
        switch (event.keyCode) {
          /** 左 */
          case 37:
            mygraph.init({
              type: "circle",
              style: {
                color: "green"
              }
            });
            break;
            /** 上 */
          case 38:
            mygraph.init({
              // svgid:"123",
              type:"path",
              direction: "DLDLDRR",
              style: {
                color: "red"
              }
            });
            break;
            /** 右 */
          case 39:
            mygraph.init({
              style: {
                color: "black"
              }
            });
            break;
            /** 下 */
          case 40:
            mygraph.init({
              direction:'UURDRDLL',
              style: {
                color: "green"
              }
            });
            break;
          default:
            break;
        }
        mygraph.showGraph();
      };
    }
  }
};
</script>
<style>
svg {
  width: 1000px;
  height: 600px;
  border: 1px solid grey;
}
#tip {
  float: left;
}
th,
td {
  border: 1px dashed grey;
  padding: 2px;
}
</style>

