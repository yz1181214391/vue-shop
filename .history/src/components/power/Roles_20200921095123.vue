<template>
  <div>
     <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区 -->
      <el-button type="primary">添加角色</el-button>

      <!-- 角色列表区 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row :class="['bdbottom', i1 === 0 ? 'bdtop':'','vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRolesById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环渲染二级权限 -->
                <el-row :class="[i2 ===0 ? '':'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="danger" closable @close="removeRolesById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable  @close="removeRolesById(scope.row,item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template  v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%">
      <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defkeys"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      // 角色列表数据
      rolesList:[],
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible : false,
      // 所有权限的数据
      rightsList:[],
      // 树形控件的属性绑定对象
      treeProps: {
          children: 'children',
          label: 'authName'
      },
      // 默认选中的节点ID值数组
      defkeys:[]
    }
  },
  created(){
    this.getRolesList()
  },
  methods:{
    // 获取角色列表数据
    async getRolesList(){
      const {data : res} = await this.$http.get('roles');
      if(res.meta.status !== 200){
        return this.$message.error(获取角色列表失败)
      }
      this.rolesList = res.data
      console.log(this.rolesList)
    },
    //根据ID删除对应的权限
    async removeRolesById(role,rightId){
        const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',
          {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }
        ).catch(err => err);
        if(confirmResult !== 'confirm'){
          return this.$message.info('取消了删除')
        }
      const {data : res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      if(res.meta.status !== 200){
        return this.$message.error('删除权限失败')
      };
      role.children = res.data;
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role){
      // 获取权限列表树形数据
      const {data : res} = await this.$http.get('rights/tree');
      if(res.meta.status !== 200){
        return this.$message.error(获取角色列表失败)
      };
      // 把获取到的权限数据保存到data中
      this.rightsList = res.data;

      //递归获取三级节点的id
      this.getLeafKeys(role,this.defkeys)
      //让分配权限对话框的显示
      this.setRightDialogVisible = true;
    },
    // 通过递归获取角色下所有三级权限的ID，并保存到defkeys数组中
    getLeafKeys(node,arr){
      //如果当前node节点中不包括children属性，则是三级权限节点
      if(!node.children){
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafKeys(item,arr))
    }
  }
}
</script>
<style lang="less" scoped>
  .el-tag{
    margin: 7px;
  }
  .bdtop{
    border-top: 1px solid #eee;
  }
   .bdbottom{
    border-bottom: 1px solid #eee;
  }
  .vcenter{
    display: flex;
    align-items: center
  }
</style>
