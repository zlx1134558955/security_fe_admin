<template>
  <div>
    <div class="filt">
      <div class="left-box">
        <span>用户状态：</span>
        <el-select v-model="status" placeholder="请选择用户状态" @change="getAdminUsers" size="mini">
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span class="filt-label">用户账号：</span>
        <el-input v-model="account" placeholder="请输入账号" @change="getAdminUsers" size="mini"></el-input>
        <span class="filt-label">用户名：</span>
        <el-input v-model="username" placeholder="请输入用户名" @change="getAdminUsers" size="mini"></el-input>
      </div>
      <el-button type="primary" @click="addAdmin" v-if="type === 1" size="mini">添加管理员</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="list" v-my_table_scroll="760" style="width: 100%" border>
      <el-table-column prop="account" label="账号" width="150">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="create_at" label="创建时间" width="180">
        <template slot-scope="scoped">
          <span>{{ scoped.row.create_at | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_at" label="最后登录时间" width="180">
        <template slot-scope="scoped">
          <span>{{ scoped.row.update_at | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="用户状态" width="100" align="center">
        <template slot-scope="scoped">
          <span>{{ map.user_status[scoped.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" width="180" align="center">
        <template slot-scope="scoped">
          <el-button type="primary" size="mini"
            v-if="scoped.row.status === 0 && type === 1 && scoped.row.id != currentId"
            @click="unfreezeAdminUser(scoped.row.id)">解禁</el-button>
          <el-button type="warning" size="mini"
            v-if="scoped.row.status === 1 && type === 1 && scoped.row.id != currentId"
            @click="forbidAdminUser(scoped.row.id)">禁用</el-button>
          <el-button type="danger" size="mini" @click="openDelete(scoped.row.id)"
            v-if="scoped.row.id != currentId && type === 1">删除</el-button>
          <el-tag v-if="scoped.row.id == currentId">我</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="pageList" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog title="提示" :visible.sync="showDelete" width="400px" center>
      <span>确定要删除该用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser">确 定</el-button>
      </span>
    </el-dialog>
    <AddAdmin :showAdd="showAdd" @close="closeAdd" @getList="getAdminUsers"></AddAdmin>
  </div>
</template>
<style scoped lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>