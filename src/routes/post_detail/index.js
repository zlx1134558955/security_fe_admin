import MAP from '@/assets/map/map.js'
export default {
  data () {
    return {
      id: parseInt(this.$router.history.current.query.id),
      detail: {
        title: '',
        rank: 1,
        points: 0,
        score: 0
      },
      map: MAP,
      categoryMap: [],
      advise: 2,
      reason: '',
      postState: []
    }
  },
  created () {
    this.getPostDetail()
    this.getPostState()
    this.getCategory()
  },
  methods: {
    formatTime (value, fmt) {
      const getDate = new Date(parseInt(value))
      const o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    getPostDetail () {
      const url = this.$route.meta.api.post + `/${this.id}`
      this.axios.get(url).then(res => {
        if (res.data.code === 0) {
          this.detail = res.data.data
        }
      })
    },
    getPostState () {
      const url = this.$route.meta.api.postState + `/${this.id}`
      this.axios.get(url).then(res => {
        if (res.data.code === 0) {
          this.postState = res.data.data
          const obj = {
            time: this.detail.time,
            status: 1
          }
          this.postState.unshift(obj)
        }
      })
    },
    getCategory () {
      const url = this.$route.meta.api.category
      this.axios.get(url).then(res => {
        if (res.data.code === 0) {
          this.categoryMap = res.data.data
        }
      })
    },
    getCateName (id) {
      let name
      this.categoryMap.some(item => {
        if (id === item.id) {
          name = item.name
          return true
        }
      })
      return name
    },
    reviewPost (status) {
      const form = {
        status: status,
        rank: this.detail.rank,
        score: this.detail.score,
        points: this.detail.points,
        content: this.reason
      }
      const url = this.$route.meta.api.post + `/${this.id}`
      this.axios.put(url, form).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: '状态提交成功',
            type: 'success'
          })
          this.getPostDetail()
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    },
    getAttachment () {
      const form = {
        filename: this.detail.attachment
      }
      const url = this.$route.meta.api.postAttachment
      this.axios.put(url, form, { responseType: 'blob' }).then((res) => {
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
      this.$router.push('/post-list')
    }
  }
}
