<template>
  <div class="main-box">
    <!--首页面-->
    <el-container>
      <el-aside width="230px">
        <!--    顶部Logo-->
        <div class="aside-top">
          <img src="../../assets/logo.png" alt="">
          <span style="font-size: x-large">尚马教育</span>
        </div>

        <!--    导航栏-->
        <!--表示可滚动的区域-->
        <el-scrollbar style="height: 93%">
          <el-menu
              default-active="4"
              background-color="#CCE8CF"
              class="el-menu-vertical-demo"
              router>

            <menu-components v-for="(item,index) in menuList" :key="index" :meizi="item"/>

          </el-menu>
        </el-scrollbar>

      </el-aside>

      <!--      头区域-->
      <el-container>
        <el-header height="60px">
          <div class="adminInfo">



          </div>
        </el-header>

        <!--      中间区域-->
        <el-main>
          <div class="body-box">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menuComponents from "@/components/menuComponents";

export default {
  components: {menuComponents},
  name: "index",
  data() {
    return {
      menuList: [],
      adminInfo: ``,
    }
  },
  created() {
    this.menuList = JSON.parse(localStorage.getItem("menuItems"));
    this.adminInfo = JSON.parse(localStorage.getItem("admin"));

  },
  methods: {}
}
</script>

<style lang="scss">

.main-box {
  width: 100%;
  height: 100%;
}

.el-scrollbar {
  height: calc(100% - 60px);
}

.el-header {
  background-color: #CCE8CF;
  color: #333;
  text-align: right;
  line-height: 60px;
  padding-right: 80px;
}

.el-aside {
  background-color: #CCE8CF;
  color: #CCE8CF;

  .aside-top {
    height: 60px;
    line-height: 60px;
    background-color: #000000;
  }

  .aside-top {
    padding-left: 28px;
  }

  .aside-top span {
    margin-left: 5px;
    font-size: larger;
    font-family: 华文行楷;
    color: #FFFFFF;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle; //修改对齐方式
  }

  /*隐藏地步滚动条*/
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  //.el-scrollbar{
  //  height: 100%;
  //}

}

.el-main {
  background-color: #E9EEF3;
  padding: 5px 0px 0px 5px;
  color: #333;

  .body-box {
    width: 100%;
    height: 100%;
    padding: 20px 5px 0px 15px;
    box-sizing: border-box;
    background-color: #CCE8CF;
  }

}

.el-container {
  height: 100%;

}

.adminInfo {
  margin-top: 10px;
  margin-left: 1395px;
  width: 250px;
  height: 50px;
  background-color: #FFFFFF;
}
</style>