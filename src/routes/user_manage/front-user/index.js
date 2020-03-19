import MAP from '@/utils/map/map.js'
export default {
  data () {
    return {
      list: [],
      map: MAP,
      pageSize: 10,
      pageList: [10, 20, 30, 40],
      currentPage: 1,
      status: -1,
      account: '',
      username: '',
      total: 0,
      statusList: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '禁止登录',
          value: 0
        },
        {
          label: '正常',
          value: 1
        }
      ],
      showDelete: false,
      deleteId: 0
    }
  },
  created () {
    this.getFrontUsers()
  },
  methods: {
    getFrontUsers () {
      const url = this.$route.meta.api.getFrontUsers
      const form = {
        status: this.status,
        account: this.account,
        username: this.username,
        start: (this.currentPage - 1) * this.pageSize,
        pageSize: this.pageSize
      }
      this.axios.post(url, form).then(res => {
        if (res.data.code === 0) {
          this.list = res.data.data.list
          this.total = res.data.data.total
        }
      })
    },
    forbidFrontUser (id) {
      const url = this.$route.meta.api.forbidFrontUser
      const form = {
        id: id
      }
      this.axios.post(url, form).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: '用户禁用成功',
            type: 'success'
          })
          this.getFrontUsers()
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    },
    unfreezeFrontUser (id) {
      const url = this.$route.meta.api.unfreezeFrontUser
      const form = {
        id: id
      }
      this.axios.post(url, form).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: '用户限制解除',
            type: 'success'
          })
          this.getFrontUsers()
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    },
    openDelete (id) {
      this.showDelete = true
      this.deleteId = id
    },
    deleteUser () {
      const url = this.$route.meta.api.deleteFrontUser
      const form = {
        id: this.deleteId
      }
      this.axios.post(url, form).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: '用户已删除',
            type: 'success'
          })
          this.getFrontUsers()
          this.showDelete = false
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
          this.showDelete = false
        }
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getFrontUsers()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getFrontUsers()
    }
  }
}
