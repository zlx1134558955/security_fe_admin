<template>
  <div>
    <!-- 顶部过滤栏 -->
    <div class="filt">
      <div class="left-box">
        <span>公告标题：</span>
        <el-input v-model="title" placeholder="请输入公告标题" size="mini" @change="getNoticeList"></el-input>
      </div>
      <div>
        <el-button type="primary" size="mini" class="add-btn" @click="addNotice">新增公告</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="list" v-my_table_scroll="760" style="width: 100%" border>
      <el-table-column prop="title" label="公告标题">
        <template slot-scope="notice">
          <HeadName :avatar="env.noticeCoverDIR + notice.row.picture" :name="notice.row.title" :w="30" :h="30">
          </HeadName>
        </template>
      </el-table-column>
      <el-table-column prop="top" label="是否置顶" width="100" align="center">
        <template slot-scope="notice">
          <span>{{ map.top[notice.row.top] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="180">
        <template slot-scope="notice">
          <span>{{ notice.row.create_time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="180">
        <template slot-scope="notice">
          <span>{{ notice.row.update_time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" width="180" align="center">
        <template slot-scope="notice">
          <el-button type="primary" size="mini" class="add-btn" @click="editNotice(notice.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="openDelete(notice.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="pageList" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog title="提示" :visible.sync="showDelete" width="400px" center>
      <span>确定要删除该公告吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteNotice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>