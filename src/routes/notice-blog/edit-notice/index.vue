<template>
  <div class="content">
    <el-button type="primary" size="mini" @click="back" class="back">返回</el-button>
    <div class="notice-form">
      <el-form :model="notice" :rules="rules" label-width="120px" class="demo-ruleForm" ref="form">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="notice.title"></el-input>
        </el-form-item>
        <el-form-item label="公告封面图片">
          <el-upload class="cover-uploader" action="/" :show-file-list="false" :http-request="setPicture"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.webp">
            <img v-if="coverImg" :src="coverImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="公告内容" prop="content" class="notice-detail">
          <Editor v-model="notice.content"></Editor>
        </el-form-item>
        <el-form-item label="特殊资源" prop="top">
          <el-radio v-model="notice.top" :label="1">置顶</el-radio>
          <el-radio v-model="notice.top" :label="2">非置顶</el-radio>
        </el-form-item>
        <el-form-item label="公告附件" prop="content" class="upload-attach">
          <el-upload class="upload-demo" action="/" :http-request="uploadAttachment" :limit="1"
            accept=".zip,.rar,.doc,.docx,.7z,.gz,.bz2">
            <el-button size="small">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持.doc、.docx、.zip、.rar、.7z、.gz、.bz2文件，最多同时上传一份</div>
          </el-upload>
          <p v-if="!attachment" class="attach-name" @click="getAttachment">{{ notice.attachment }}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" class="submit-btn" @click="editNotice">保存编辑</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>