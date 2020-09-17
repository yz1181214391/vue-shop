<template>
  <el-container>
    <!-- 头部区 -->
    <el-header>
      <div>
        <img src="../assets/love.png" alt="">
        <span>电商管理后台系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside  :width="isCollapse ? '64px': '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
         <el-menu background-color="#333744" text-color="#fff" active-text-color="#409BFF"
         :unique-opened = "true" :collapse='isCollapse' :collapse-transition="false"
         :router='true' :default-active="activePath">
            <el-submenu :index="item.id + ''" v-for="item in menList" :key="item.id">
              <!-- 一级菜单 -->
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children"
              :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main class="el-main">
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      //左侧菜单数据
      menList: [],
      // 字体图标
      iconsObj : {
         125 : 'iconfont icon-1',
         103 : 'iconfont icon-quanxianguanli',
         101 : 'iconfont icon-shangpin',
         102 : 'iconfont icon-dingdanguanli',
         145 : 'iconfont icon-shuju',
      },
      // 是否折叠
      isCollapse : false,
      // 被激活的链接
      activePath : ''
    }
  },

  created(){
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods:{
    logout(){
      // 清除token
      window.sessionStorage.clear();
      // 跳转到登录login页面
      this.$router.push('./login')
    },
    //获取侧边栏所有菜单
    async getMenuList() {
      const {data : res} = await this.$http.get('menus');
      // console.log(res);
      if(res.meta.status !== 200) return this.$message.console.error(res.meta.msg);
      this.menList = res.data;
    },
    //点击按钮，切换菜单栏折叠与展开
    toggleCollapse(){
      this.isCollapse = !this.isCollapse;
    },
    //保存当前点击菜单栏数据
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath);
      this.activePath = activePath
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
    .el-menu{
      border-right: 0;
    }
  }
  .el-main{
    background-color: #eaedf1;
  }
  .iconfont{
    margin-right: 10px;
    color: #ffffff;
  }
  .toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
