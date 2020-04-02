import MAP from '@/assets/map/map.js'
import ENV from 'Config/env.js'
import Editor from '@/components/editor/index.vue'
export default {
  data () {
    return {
      map: MAP,
      env: ENV,
      notice: {
        title: '',
        top: 2,
        content: '',
        picture: null,
        attachment: null
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
      coverImg: ''
    }
  },
  components: {
    Editor
  },
  created () {
  },
  methods: {
    addNotice () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        const form = new FormData()
        if (this.notice.picture) {
          form.append('picture', this.notice.picture, this.notice.picture.name) // 将文件添加到formdata中
        }
        if (this.notice.attachment) {
          form.append('attachment', this.notice.attachment, this.notice.attachment.name) // 将文件添加到formdata中
        }
        form.append('title', this.notice.title)
        form.append('content', this.notice.content)
        form.append('top', this.notice.top)
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        this.axios.post(this.$route.meta.api.notice, form, config) // 传输数据
          .then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: '发布成功',
                type: 'success'
              })
              this.$router.push('/notice-manage')
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
      this.notice.picture = params.file
      const url = window.URL.createObjectURL(this.notice.picture)
      this.coverImg = url
    },
    uploadAttachment (params) {
      this.notice.attachment = params.file
    },
    back () {
      this.$router.push('/notice-manage')
    }
  }
}
