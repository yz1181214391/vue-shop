<template>
  <div class="home-box">
    <button @click="loginBtn">退回</button>
  </div>
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
  .home-box{
    height: 100%;
  }
</style>
