import ENV from 'Config/env'
export default {
  data () {
    return {
      labelPosition: 'right',
      form: {
        id: 0,
        type: 1,
        title: '',
        price: 1,
        stock: 1,
        visible: 1,
        gift_category_id: 1,
        image: 'default.jpg',
        detail: ''
      },
      image_url: `${ENV.giftDIR}default.jpg`,
      image: null,
      rules: {
        title: [
          { required: true, message: '请输入礼品名称', trigger: 'blur' },
          { min: 1, max: 40, message: '礼品名称不得超过40个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'change' }
        ],
        stock: [
          { required: true, message: '请输入库存', trigger: 'change' }
        ],
        gift_category_id: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        visible: [
          { required: true, message: '请选择上架状态', trigger: 'change' }
        ],
        detail: [
          { required: true, message: '请输入礼品详情', trigger: 'blur' },
          { min: 1, max: 500, message: '礼品描述不得超过500个字符', trigger: 'blur' }
        ]
      },
      err: '',
      fullscreenLoading: false
    }
  },
  props: ['dialogShow', 'currentGift', 'cateList'],
  computed: {
    title () {
      return this.id === 0 ? '添加礼品' : '编辑礼品'
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    uploadImage (params) {
      this.image = params.file
      const url = window.URL.createObjectURL(this.image)
      this.image_url = url
    },
    saveGift () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        const file = this.image // 获取文件对象
        const form = new FormData()
        if (file) {
          form.append('image', file, file.name) // 将文件添加到formdata中
        }
        form.append('type', this.form.type)
        form.append('title', this.form.title)
        form.append('price', this.form.price)
        form.append('stock', this.form.stock)
        form.append('visible', this.form.visible)
        form.append('gift_category_id', this.form.gift_category_id)
        form.append('detail', this.form.detail)
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        if (this.form.id === 0) {
          const url = this.$route.meta.api.gift
          this.addGift(url, form, config)
        } else {
          const url = this.$route.meta.api.gift + `/${this.form.id}`
          this.editGift(url, form, config)
        }
      })
    },
    addGift (url, form, config) {
      this.axios.post(url, form, config) // 传输数据
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '添加礼品成功',
              type: 'success'
            })
            this.$emit('getGiftsList')
            this.handleClose()
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
    },
    editGift (url, form, config) {
      this.axios.put(url, form, config) // 传输数据
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '编辑礼品成功',
              type: 'success'
            })
            this.$emit('getGiftsList')
            this.handleClose()
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
    }
  },
  watch: {
    currentGift (val) {
      this.image = null
      this.image_url = `${ENV.giftDIR}${val.image}`
      const form = this.form
      for (const key in form) {
        form[key] = val[key]
      }
    }
  }
}
