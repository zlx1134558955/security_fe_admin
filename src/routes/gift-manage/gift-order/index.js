import MAP from '@/utils/map/map'
export default {
  data () {
    return {
      map: MAP,
      list: []
    }
  },
  created () {
    this.getGiftOrderList()
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
    jumpDetail (id) {
      this.$router.push(`/gift-detail?id=${id}`)
    }
  }
}
