<template>
  <div>
    <el-menu-item v-if="!meizi.children || meizi.children.length==0" :index="meizi.menuRouter">
      <e-icon :icon-name="meizi.menuIcon"/>
      <span slot="title">{{ meizi.menuTitle }}</span>
    </el-menu-item>
    <el-submenu v-if="meizi.children && meizi.children.length>0" :index="meizi.menuRouter">
      <template slot="title">
        <e-icon :icon-name="meizi.menuIcon"/>
        <span>{{ meizi.menuTitle }}</span>
      </template>
      <menu-components v-for="(item,index) in meizi.children" :key="index" :meizi="item"/>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "menuComponents",
  props: ['meizi']
}
</script>

<style scoped>

</style>