<template>
  <div>
    <div class="btn-box">
      <el-button type="primary" size="mini" class="add-btn" @click="addCate">添加漏洞分类</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" border v-my_table_scroll="760">
      <el-table-column type="index" width="50" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="pid" label="父类名称" width="150" align="center">
        <template slot-scope="scoped">
          <span>{{ cateMap[scoped.row.pid] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="漏洞名称">
      </el-table-column>
      <el-table-column prop="id" label="操作" width="100" align="center">
        <template slot-scope="scoped">
          <el-button type="primary" size="mini" @click="updateCate(scoped.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Update :showUpdate="showUpdate" @close="closeUpdate" :id="currentId" :currentName="currentName"
      :currentPid="currentPid" :parentList="parentList"></Update>
  </div>
</template>
<style scoped lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>