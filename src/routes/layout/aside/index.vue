<template>
  <el-aside width="200px">
    <el-menu :default-active="active" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">daohang2</span>
      </el-menu-item>
      <el-submenu index="post">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>漏洞管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="category" @click="jump('/category-manage')">漏洞分类</el-menu-item>
          <el-menu-item index="review" @click="jump('/post-list')">漏洞审核</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="gift">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>礼品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="giftorder" @click="jump('/gift-order')">礼品订单</el-menu-item>
          <el-menu-item index="giftslist" @click="jump('/gift-manage')">礼品列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="user" @click="jump('/front-user')">前台用户</el-menu-item>
          <el-menu-item index="admin" @click="jump('/admin-user')">管理员</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="notice-and-blog">
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span>公告博客</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="notice" @click="jump('/notice-manage')">公告管理</el-menu-item>
          <el-menu-item index="blog" @click="jump('/admin-user')">博客管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="setting" @click="jump('/setting')">
        <i class="el-icon-setting"></i>
        <span slot="title">站点管理</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<style scoped lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>