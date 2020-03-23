import EditGift from '../components/edit-gift/index.vue'
import GiftCategory from '../components/category-manage/index.vue'
import MAP from '@/assets/map/map'
import ENV from 'Config/env.js'
export default {
  data () {
    return {
      dialogShow: false,
      categoryShow: false,
      form: {
        gift_category: -1,
        visible: -1,
        title: ''
      },
      currentGift: {
        id: 0,
        title: '',
        price: 1,
        stock: 1,
        type: 1,
        visible: 1,
        gift_category: 1,
        image: 'default.jpg',
        detail: ''
      }, // 编辑礼品传给子组件的礼品数据
      giftsList: [],
      cateList: [], // 传给子组件的礼品类别
      categoryList: [], // 自己过滤选择的礼品类别
      env: ENV,
      map: MAP.gift_type
    }
  },
  components: {
    EditGift,
    GiftCategory
  },
  created () {
    this.getGiftsList()
    this.getGiftCate()
  },
  methods: {
    getGiftCate () {
      const url = this.$route.meta.api.getGiftCate
      this.axios.get(url).then(res => {
        if (res.data.code === 0) {
          this.cateList = res.data.data
          this.categoryList = JSON.parse(JSON.stringify(this.cateList))
          this.categoryList.unshift({ name: '全部', id: -1 })
        }
      })
    },
    closeUpdate () {
      this.dialogShow = false
    },
    closeCategory () {
      this.categoryShow = false
    },
    addCate () {
      this.currentGift = {
        id: 0,
        title: '',
        price: 1,
        stock: 1,
        type: 1,
        visible: 1,
        gift_category: 1,
        image: 'default.jpg',
        detail: ''
      }
      this.dialogShow = true
    },
    getGiftsList () {
      const url = this.$route.meta.api.getGiftsList
      const obj = this.form
      this.axios.post(url, obj).then(res => {
        if (res.data.code === 0) {
          this.giftsList = res.data.data
        }
      })
    },
    editCate (gift) {
      this.currentGift = gift
      this.dialogShow = true
    },
    openCategory () {
      this.categoryShow = true
    }
  }
}
