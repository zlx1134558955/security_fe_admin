<template>
  <div class="content">
    <el-button type="primary" size="mini" @click="back" class="back">返回</el-button>
    <div class="top-box">
      <div>
        <img :src="detail.image" alt="礼品图片" class="gift-image">
      </div>
      <div class="right-box">
        <h2>{{ detail.title }}</h2>
        <div>
          <el-collapse accordion>
            <el-collapse-item title="展示礼品详情">
              <pre>{{ detail.detail }}</pre>
            </el-collapse-item>
          </el-collapse>
          <p>用户账号：{{ detail.account }}</p>
          <p>礼品兑换数量：{{ detail.num }}</p>
          <p>订单类型：{{ map.gift_type[detail.type] }}</p>
          <p>订单创建时间：{{ detail.create_time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</p>
          <p>订单状态：{{ map.gift_status[detail.status] }}</p>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div v-show="detail.status === 2">
      <p class="little-title">订单处理情况</p>
      <p>快递公司：{{ detail.company }}</p>
      <p>快递单号：{{ detail.tracking_number }}</p>
      <div class="order-info">订单说明：
        <pre>{{ detail.content }}</pre>
      </div>
    </div>
    <div v-show="detail.status === 3">
      <p class="little-title">订单处理情况</p>
      <p>订单已取消。</p>
    </div>
    <div v-show="detail.status === 1">
      <p class="little-title">订单处理</p>
      <el-form ref="form" :model="detail" label-width="100px">
        <el-form-item label="处理意见">
          <el-radio-group v-model="status">
            <el-radio :label="2">发放</el-radio>
            <el-radio :label="3">取消</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="input-box">
          <el-form-item label="快递公司" v-show="status === 2">
            <el-input v-model="detail.company"></el-input>
            <span class="input-tip">(虚拟订单无需填写)</span>
          </el-form-item>
          <el-form-item label="快递单号" v-show="status === 2">
            <el-input v-model="detail.tracking_number"></el-input>
            <span class="input-tip">(虚拟订单无需填写)</span>
          </el-form-item>
          <el-form-item label="订单说明">
            <el-input :rows="5" type="textarea" v-model="detail.content"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="handleOrder" size="mini">提交</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>