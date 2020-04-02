import MAP from '@/assets/map/map'
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
      gift_category_id: 0,
      gift_status: 0,
      status_arr: []
    }
  },
  created () {
    this.getGiftOrderList()
    this.getGiftCate()
    this.handleStatusArr()
  },
  methods: {
    getGiftOrderList () {
      const url = this.$route.meta.api.giftOrderList
      const form = {
        status: this.gift_status,
        gift_category_id: this.gift_category_id,
        start: (this.currentPage - 1) * this.pageSize,
        pageSize: this.pageSize
      }
      this.axios.put(url, form).then(res => {
        if (res.data.code === 0) {
          this.list = res.data.data.rows
          this.total = res.data.data.count
        }
      })
    },
    getGiftCate () {
      const url = this.$route.meta.api.giftCategory
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
    },
    handleStatusArr () {
      for (const key in this.map.gift_status) {
        const obj = {
          key: key,
          title: this.map.gift_status[key]
        }
        this.status_arr.push(obj)
      }
    }
  }
}
