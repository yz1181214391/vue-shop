<template>
  <el-container class="el-container">
    <!-- 头部区 -->
    <el-header class="el-header">
      <div>
        <img src="../assets/love.png" alt="">
        <span>电商管理后台系统</span>
      </div>
      <el-button type="info" @click="loginBtn">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="el-aside" width="200px">
        <!-- 侧边栏菜单区域 -->
         <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
          </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main class="el-main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
methods:{
  loginBtn(){
    // 清除token
    window.sessionStorage.clear();
    // 跳转到登录login页面
    this.$router.push('./login')
  }
}
}
</script>
<style lang="less" scoped>
  .el-container{
    height: 100%;
  }
  .el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;

    >div{
      display: flex;
      align-items: center;
        >img{
          width: 54px;
          height: 54px;
          border-radius: 50%;
        }
        >span{
          margin-left: 20px;
          color: #ffffff;
        }
    }
  }
  .el-aside{
    background-color: #333744;
  }
  .el-main{
    background-color: #eaedf1;
  }
</style>
