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
              default-active="1"
              background-color="#CCE8CF"
              class="el-menu-vertical-demo"
              router="ture">
            <el-menu-item index="/main/index">
              <i class="el-icon-s-flag"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item index="admin">
                <i class="el-icon-position"></i>
                <span slot="title">员工管理</span>
              </el-menu-item>
              <el-menu-item index="role">
                <i class="el-icon-position"></i>
                <span slot="title">角色管理</span>
              </el-menu-item>
              <el-menu-item index="menu">
                <i class="el-icon-position"></i>
                <span slot="title">权限管理</span>
              </el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>日志管理</span>
                </template>
                <el-menu-item index="2-4-1">
                  <i class="el-icon-position"></i>
                  <span slot="title">登陆日志</span>
                </el-menu-item>
                <el-menu-item index="2-4-2">
                  <i class="el-icon-position"></i>
                  <span slot="title">操作日志</span>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品相关</span>
              </template>
              <el-menu-item index="brand">
                <i class="el-icon-position"></i>
                <span slot="title" >品牌管理</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-position"></i>
                <span slot="title">分类管理</span>
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-position"></i>
                <span slot="title">商品管理</span>
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-position"></i>
                <span slot="title">赠品管理</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单相关</span>
              </template>
              <el-menu-item index="4-1">
                <i class="el-icon-position"></i>
                <span slot="title">购物车管理</span>
              </el-menu-item>
              <el-menu-item index="4-2">
                <i class="el-icon-position"></i>
                <span slot="title">订单管理</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>退货相关</span>
              </template>
              <el-menu-item index="5-1">
                <i class="el-icon-position"></i>
                <span slot="title">退货管理</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>

      </el-aside>
      <!--      头区域-->
      <el-container>
        <el-header height="60px">



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


export default {
  name: "index",
  methods: {


  }
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
</style>