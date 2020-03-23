import MAP from '@/assets/map/map.js'
import AddAdmin from '../add-admin/index.vue'
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
      deleteId: 0,
      showAdd: false
    }
  },
  components: {
    AddAdmin
  },
  created () {
    this.getAdminUsers()
  },
  computed: {
    currentId () {
      return this.$store.state.adminInfo.id
    },
    type () {
      return this.$store.state.adminInfo.type
    }
  },
  methods: {
    getAdminUsers () {
      const url = this.$route.meta.api.getAdminUsers
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
    forbidAdminUser (id) {
      const url = this.$route.meta.api.forbidAdminUser
      const form = {
        id: id
      }
      this.axios.post(url, form).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: '用户禁用成功',
            type: 'success'
          })
          this.getAdminUsers()
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    },
    unfreezeAdminUser (id) {
      const url = this.$route.meta.api.unfreezeAdminUser
      const form = {
        id: id
      }
      this.axios.post(url, form).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: '用户限制解除',
            type: 'success'
          })
          this.getAdminUsers()
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
      const url = this.$route.meta.api.deleteAdminUser
      const form = {
        id: this.deleteId
      }
      this.axios.post(url, form).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: '用户已删除',
            type: 'success'
          })
          this.getAdminUsers()
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
    addAdmin () {
      this.showAdd = true
    },
    closeAdd () {
      this.showAdd = false
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getAdminUsers()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAdminUsers()
    }
  }
}
