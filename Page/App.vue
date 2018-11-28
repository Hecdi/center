<template>
  <div id="app">
    <el-container>
      <el-header height="50px;">
        <div
id="nav"
class="top-menu navbar navbar-dark bg-inverse">
          <a class="navbar-brand"
href="javascript:void(0)" /> <span class="navbar-departName">
机坪摆渡电气空调
</span>
          <ul class="nav navbar-nav">
            <router-link
tag="li" to="/" class="nav-item" exact> 排班 </router-link>
            <router-link
tag="li" to="/checkIn" class="nav-item"> 点到 </router-link>
            <router-link
tag="li" to="/urgentReport" class="nav-item"> 偏离上报 </router-link>
            <router-link
tag="li" to="/violations" class="nav-item"> 违规记录 </router-link>
            <router-link
tag="li" to="/report" class="nav-item"> 报表 </router-link>
            <router-link
tag="li" to="/statistics" class="nav-item"> 统计 </router-link>
            <router-link
tag="li" to="/operationManual" class="nav-item"> 操作手册 </router-link>
          </ul>
        </div>
      </el-header>
      <el-container> <RouterView /> </el-container>
    </el-container>
  </div>
</template>
