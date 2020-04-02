import MAP from '@/assets/map/map.js'
import ENV from 'Config/env'
export default {
  data () {
    return {
      id: parseInt(this.$router.history.current.query.id),
      detail: {
        num: 1,
        status: 1,
        type: 2,
        content: '',
        company: 'SF',
        tracking_number: '',
        end_time: '',
        create_time: '',
        gift: {
          title: '',
          image: '',
          detail: ''
        },
        member: {
          account: ''
        },
        realname: '',
        zipcode: '',
        adetail: '',
        mobile: ''
      },
      map: MAP,
      env: ENV,
      status: 2
    }
  },
  created () {
    this.getGiftOrderDetail()
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
    getGiftOrderDetail () {
      const url = this.$route.meta.api.giftOrder + `/${this.id}`
      this.axios.get(url).then(res => {
        if (res.data.code === 0) {
          this.detail = res.data.data
          this.detail.gift.image = this.env.giftDIR + res.data.data.gift.image
        }
      })
    },
    handleOrder () {
      let form
      const url = this.$route.meta.api.giftOrder + `/${parseInt(this.id)}`
      if (this.status === 2) {
        form = {
          status: this.status,
          tracking_number: this.detail.tracking_number,
          company: this.detail.company,
          content: this.detail.content
        }
      } else {
        form = {
          status: this.status,
          content: this.detail.content
        }
      }
      this.axios.put(url, form).then(res => {
        if (res.data.code === 0) {
          this.getGiftOrderDetail()
          this.$message({
            message: '订单处理成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    },
    back () {
      this.$router.push('/gift-order')
    }
  }
}
