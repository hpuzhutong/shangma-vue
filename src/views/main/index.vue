<template>

    <div class="main-box">
      <!--首页面-->
      <el-container>
        <el-aside width="230px">
          <!--    顶部Logo-->
          <div class="aside-top">
            <img src="../../assets/logo.png" alt="">
            <span style="font-size: x-large;color: black">尚马教育</span>
          </div>

          <!--    导航栏-->
          <!--表示可滚动的区域-->
          <el-scrollbar style="height: 93%">
            <el-menu
                default-active="4"
                background-color="#E9EEF3"
                class="el-menu-vertical-demo"
                text-color="black"
                router>

              <menu-components v-for="(item,index) in menuList" :key="index" :meizi="item"/>

            </el-menu>
          </el-scrollbar>

        </el-aside>

        <!--      头区域-->
        <el-container>
          <el-header height="60px" :model="adminInfo">
            <div class="adminInfo">
              <div class="img">
                <img :src="adminInfo.adminAvatar" alt="" height="40px" width="40px">
              </div>
              <div class="name">
                <span>欢迎您：{{ adminInfo.adminName }}</span>
              </div>
              <div class="exit">
                <el-button type="info" size="mini" plain @click="exitLogin">退出</el-button>
              </div>
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
import router from "@/router";

export default {
  components: {menuComponents},
  name: "index",
  data() {
    return {
      menuList: [],
      adminInfo: {
        adminAvatar: '',
        adminAccount: '',
      },
    }
  },
  created() {
    this.menuList = JSON.parse(localStorage.getItem("menuItems"));
    this.adminInfo = JSON.parse(localStorage.getItem("admin"));

  },
  methods: {
    exitLogin() {
      localStorage.clear();
      router.push("/")
    }
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
  color: #333;
  text-align: right;
  line-height: 60px;
  padding-right: 80px;
  background-color: #E9EEF3;
}

.el-aside {
  background-color: #E9EEF3;
  color: #343A40;

  .aside-top {
    height: 60px;
    line-height: 60px;
    background-color: #E9EEF3;
  }

  .aside-top {
    padding-left: 28px;
  }

  .aside-top span {
    margin-left: 5px;
    font-size: larger;
    font-family: 华文行楷;
    color: #E9EEF3;
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
    background-color: #E9EEF3;
  }

}

.el-container {
  height: 100%;

}

.adminInfo {
  margin-top: 10px;
  margin-left: 1385px;
  width: 280px;
  height: 50px;
}

.img {
  width: 40px;
  height: 40px;
  margin-left: 20px;
  float: left;
}

.name, .exit {
  margin-left: 20px;;
  margin-top: -10px;
  float: left;
}

</style>