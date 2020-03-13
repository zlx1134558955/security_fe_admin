<template>
  <div>
    <div>
      <!-- 顶部过滤栏 -->
      <div class="filt">
        <span>礼品类别：</span>
        <el-select v-model="gift_category" placeholder="请选择礼品类别" size="mini" @change="getGiftOrderList">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <span class="filt-label">上架状态：</span>
        <el-select v-model="gift_status" placeholder="请选择上架状态" size="mini" @change="getGiftOrderList">
          <el-option label="全部" :value="0"></el-option>
          <el-option v-for="(item, index) in map.gift_status" :key="index" :label="map.gift_status[item]" :value="item">
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="list" height="780" style="width: 100%" border>
      <el-table-column prop="account" label="用户账号" width="200">
      </el-table-column>
      <el-table-column prop="title" label="礼品名称" width="400">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="250">
        <template slot-scope="gift">
          <span>{{ gift.row.create_time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="订单类型">
        <template slot-scope="gift">
          <span>{{ map.gift_type[gift.row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cate" label="礼品分类">
      </el-table-column>
      <el-table-column prop="num" label="兑换数量">
      </el-table-column>
      <el-table-column prop="status" label="订单状态">
        <template slot-scope="gift">
          <span>{{ map.gift_status[gift.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" width="140">
        <template slot-scope="gift">
          <el-button type="primary" size="mini" @click="jumpDetail(gift.row.id)">查看</el-button>
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