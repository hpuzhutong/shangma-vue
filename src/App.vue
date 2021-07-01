<template>
  <div id="app">
    <!--u额面的位置是可变得-->
    <router-view/>
  </div>
</template>


<script>

</script>

<style lang="scss">
/*设置高度*/
html, body, #app {
  height: 100%;
  width: 100%;
}

/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td{
  background-color:	#FFC !important;
  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
}


</style>
