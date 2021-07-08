<template>
  <vue-particles
      id="particles-js"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="star"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
  >

    <div id="login">
      <div class="loginConbox">
        <div class="header">
          <div class="logo">
            <img src="../../assets/shangma.png" width="200px" height="80px">
          </div>
        </div>
        <div class="loginBox">
          <div class="loginCon">
            <el-card shadow="always" class="login-module">
              <div slot="header" class="clearfix formTitlt">
                <strong style="font-family: 华文行楷; font-size: xx-large;">登录</strong>
              </div>
              <el-form :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
                <el-form-item>
                  <el-input type="text" v-model="loginForm.username" auto-complete="off"
                            placeholder="请输入登录账号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input type="password" v-model="loginForm.password" auto-complete="off"
                            placeholder="请输入登录密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input type="text" v-model="loginForm.code" auto-complete="off"
                                placeholder="请输入验证码"></el-input>
                    </el-col>
                    <el-col :span="12" style="height: 65px;">
                      <img :src="codeImg" @click="getCode" alt="">
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item>
                  <el-button class="subBtn" type="primary" @click="doLogin">登录</el-button>
                </el-form-item>
                <p class="smalltxt">
                  <router-link class="a" to="#">忘记密码</router-link>
                  <router-link class="a" to="#">忘记会员名</router-link>
                  <router-link class="a" to="#">免费注册</router-link>
                </p>
              </el-form>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </vue-particles>
</template>
<script src="./index.js"></script>
<style lang="scss">
@import "index.scss";
</style>