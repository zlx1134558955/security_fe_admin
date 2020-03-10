<template>
  <el-dialog title="礼品类别" width="600px" :visible="dialogShow" :before-close="handleClose" :close-on-click-modal="false">
    <div class="tag-box">
      <div v-for="(item, index) in list" :key="index" class="tag">
        <el-input class="input-new-tag" v-if="currentIndex===index" v-model="currentValue" ref="saveCurrentInput"
          size="small" @keyup.enter.native="handleCurrentConfirm" @blur="handleCurrentConfirm">
        </el-input>
        <el-tag :disable-transitions="true" v-show="!(currentIndex===index)" @click="editCurrent(index)">{{ item.name }}
        </el-tag>
      </div>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
        @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
  </el-dialog>
</template>
<style scoped lang="scss" src='./index.scss'></style>
<script src="./index.js"></script>