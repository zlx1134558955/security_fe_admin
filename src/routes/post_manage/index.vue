<template>
  <div>
    <div class="filt">
      <span>审核状态：</span>
      <el-select v-model="status" placeholder="请选择审核状态" @change="getPostList" size="mini">
        <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span class="filt-label">漏洞类型：</span>
      <el-cascader v-model="cate_id_arr" :options="category" :props="{ expandTrigger: 'hover' }" @change="getPostList"
        size="mini">
      </el-cascader>
      <span class="filt-label">漏洞标题：</span>
      <el-input v-model="title" placeholder="请输入标题" @change="getPostList" size="mini"></el-input>
    </div>
    <!-- 表格 -->
    <el-table :data="list" v-my_table_scroll="760" style="width: 100%" border>
      <el-table-column prop="time" label="提交时间" width="180">
        <template slot-scope="scoped">
          <span>{{ scoped.row.time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cate_id" label="漏洞类型" width="150">
        <template slot-scope="scoped">
          <span>{{ getCateName(scoped.row.cate_id) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="rank" label="危险等级" width="100" align="center">
        <template slot-scope="scoped">
          <el-tag :type="typeMap[scoped.row.rank]" size="mini">{{ map.rankLevel[scoped.row.rank] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态" align="center" width="100">
        <template slot-scope="scoped">
          <span>{{ map.post_status[scoped.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" width="100" align="center">
        <template slot-scope="scoped">
          <el-button type="primary" size="mini" @click="review(scoped.row.id)"
            v-if="!(scoped.row.status===2||scoped.row.status===5)">处理</el-button>
          <el-button type="success" size="mini" @click="review(scoped.row.id)"
            v-if="scoped.row.status===2||scoped.row.status===5">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="pageList" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>
<style scoped lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>