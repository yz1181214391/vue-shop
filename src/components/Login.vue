<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区 -->
      <div class="avatar-box">
        <img src="../assets/love.png" alt="">
      </div>
      <!-- 登录表单区 -->
      <el-form :model="loginFrom" :rules="loginFromRules" ref="loginFromRef"  label-width="80px" class="login-from-box">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginFrom.username" placeholder="请输入用户名" prefix-icon="iconfont icon-portrait"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginFrom.password" type="password" placeholder="请输入密码" prefix-icon="iconfont icon-suo"></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      //登录表单的数据绑定对象
      loginFrom: {
        username:'admin',
        password:'123456'
      },
      // 表单验证规则
      loginFromRules:{
        // 用户名验证规则
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 密码验证规则
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    // 重置事件
    resetLoginFrom(){
      this.$refs.loginFromRef.resetFields();
    },
    // 登录事件
    login(){
      this.$refs.loginFromRef.validate(async (valid)=>{
        if(!valid) return;
        const {data : res} = await this.$http.post("login",this.loginFrom);
        if(res.meta.status !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");
        window.sessionStorage.setItem("token",res.data.token);
        this.$router.push("/home")
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  background-color: #2b4b6b;
  height: 100%;
}
.login-box{
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

  .avatar-box{
    height: 110px;
    width: 110px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;

    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
}

.login-from-box{
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
</style>
