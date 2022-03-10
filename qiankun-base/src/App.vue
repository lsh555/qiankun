<template>
  <div>
    <el-menu :router="true" mode="horizontal">
      <!-- 主应用中也可以放自己的路由 -->
      <el-menu-item index="/">首页</el-menu-item>
      <!-- 引用其他的子应用 -->
      <el-menu-item index="/vue">vue应用</el-menu-item>
      <el-menu-item index="/react">react应用</el-menu-item>
    </el-menu>
    <!-- 主应用路由渲染出口 -->
    <router-view v-show="$route.name"></router-view>
    <!-- 微前端子应用渲染出口 -->
    <div id="vue"></div>
    <div id="react"></div>
  </div>
</template>

<style>
</style>
