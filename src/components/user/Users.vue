<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区 -->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加按钮</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
       <el-table :data="usersData" border stripe>
        <el-table-column prop="username" label="姓名" ></el-table-column>
        <el-table-column prop="email" label="邮箱" ></el-table-column>
        <el-table-column prop="mobile" label="电话" ></el-table-column>
        <el-table-column prop="role_name" label="角色" ></el-table-column>
        <el-table-column label="状态" >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage4" :page-sizes="[1, 2, 5, 10]" :page-size="100"
      layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>

    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      usersData: [
          { email: '2016-05-02',
            username: '王小虎',
            mobile: '13336875820',
            role_name: '大神',
            mg_state: true,
          },
          { email: '2016-05-02',
            username: '王大虎',
            mobile: '13336875820',
            role_name: '大神',
            mg_state: false,
          }
      ]
    }
  },
  methods:{
    // 监听pagesize改变事件
    handleSizeChange(){

    },
    // 监听页码值改变事件
    handleCurrentChange(){

    }
  }
}
</script>
<style lang="less" scoped>

</style>
