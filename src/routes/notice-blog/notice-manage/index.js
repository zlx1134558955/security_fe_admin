import MAP from '@/assets/map/map.js'
import ENV from 'Config/env.js'
import HeadName from '@/components/head_name/index.vue'
export default {
  data () {
    return {
      title: '',
      list: [],
      map: MAP,
      env: ENV,
      pageSize: 10,
      pageList: [10, 20, 30, 40],
      currentPage: 1,
      total: 0,
      showDelete: false,
      deleteId: 0
    }
  },
  components: {
    HeadName
  },
  created () {
    this.getNoticeList()
  },
  methods: {
    getNoticeList () {
      const url = this.$route.meta.api.getNoticeList
      const form = {
        title: this.title,
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
    addNotice () {
      this.$router.push('/add-notice')
    },
    editNotice (id) {
      this.$router.push(`/edit-notice?id=${id}`)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getNoticeList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getNoticeList()
    },
    openDelete (id) {
      this.showDelete = true
      this.deleteId = id
    },
    deleteNotice () {
      const url = this.$route.meta.api.deleteNotice
      const form = {
        id: this.deleteId
      }
      this.axios.post(url, form).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: '公告已删除',
            type: 'success'
          })
          this.getNoticeList()
          this.showDelete = false
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
          this.showDelete = false
        }
      })
    }
  }
}
