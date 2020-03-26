import MAP from '@/assets/map/map.js'
import ENV from 'Config/env.js'
import Editor from '@/components/editor/index.vue'
export default {
  data () {
    return {
      id: parseInt(this.$router.history.current.query.id),
      map: MAP,
      env: ENV,
      notice: {
        title: '',
        top: 2,
        content: '',
        picture: '',
        attachment: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 40, message: '标题不能大于40个字符', trigger: 'blur' }
        ],
        top: [
          { required: true, message: '请选择是否置顶', trigger: 'change' }
        ]
      },
      coverImg: '',
      picture: null,
      attachment: null
    }
  },
  components: {
    Editor
  },
  created () {
    this.getNoticeDetail()
  },
  methods: {
    editNotice () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        const form = new FormData()
        if (this.picture) {
          form.append('picture', this.picture, this.picture.name) // 将文件添加到formdata中
        }
        if (this.attachment) {
          form.append('attachment', this.attachment, this.attachment.name) // 将文件添加到formdata中
        }
        form.append('chunk', '0')
        form.append('id', this.id)
        form.append('title', this.notice.title)
        form.append('content', this.notice.content)
        form.append('top', this.notice.top)
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        this.axios.post(this.$route.meta.api.editNotice, form, config) // 传输数据
          .then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              })
            }
          })
      })
    },
    setPicture (params) {
      this.picture = params.file
      const url = window.URL.createObjectURL(this.picture)
      this.coverImg = url
    },
    uploadAttachment (params) {
      this.attachment = params.file
    },
    getNoticeDetail () {
      const url = this.$route.meta.api.getNoticeDetail
      const form = {
        id: this.id
      }
      this.axios.post(url, form).then(res => {
        if (res.data.code === 0) {
          this.notice = res.data.data
          this.coverImg = `${this.env.noticeCoverDIR}${this.notice.picture}`
        }
      })
    },
    getAttachment () {
      const form = {
        filename: this.notice.attachment
      }
      const url = this.$route.meta.api.getNoticeAttachment
      this.axios.post(url, form, { responseType: 'blob' }).then((res) => {
        // 下载返回文件
        const type = 'application/octet-stream'
        const blob = new Blob([res.data], { type: type })
        const fileName = JSON.parse(res.config.data).filename || '未知文件'
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(blob, fileName)
        } else {
          const URL = window.URL || window.webkitURL
          const objectUrl = URL.createObjectURL(blob)
          console.log(objectUrl)
          if (fileName) {
            var a = document.createElement('a')
            if (typeof a.download === 'undefined') {
              window.location = objectUrl
            } else {
              a.href = objectUrl
              a.download = fileName
              document.body.appendChild(a)
              a.click()
              a.remove()
              this.$message({
                message: '下载成功',
                type: 'success'
              })
            }
          }
        }
      })
    },
    back () {
      this.$router.push('/notice-manage')
    }
  }
}
