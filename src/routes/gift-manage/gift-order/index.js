import MAP from '@/utils/map/map'
export default {
  data () {
    return {
      map: MAP,
      list: [],
      pageSize: 10,
      pageList: [10, 20, 30, 40],
      currentPage: 1,
      total: 0,
      categoryList: [],
      gift_category: 0,
      gift_status: 0
    }
  },
  created () {
    this.getGiftOrderList()
    this.getGiftCate()
  },
  methods: {
    getGiftOrderList () {
      const url = this.$route.meta.api.getGiftOrderList
      this.axios.get(url).then(res => {
        if (res.data.code === 0) {
          this.list = res.data.data
        }
      })
    },
    getGiftCate () {
      const url = this.$route.meta.api.getGiftCate
      this.axios.get(url).then(res => {
        if (res.data.code === 0) {
          this.categoryList = res.data.data
          this.categoryList.unshift({ name: '全部', id: 0 })
        }
      })
    },
    jumpDetail (id) {
      this.$router.push(`/gift-detail?id=${id}`)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getGiftOrderList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getGiftOrderList()
    }
  }
}
