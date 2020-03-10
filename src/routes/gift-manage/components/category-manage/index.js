export default {
  data () {
    return {
      inputVisible: false,
      inputValue: '',
      currentIndex: -1,
      currentValue: '',
      list: []
    }
  },
  props: ['dialogShow', 'cateList'],
  methods: {
    handleClose () {
      this.$emit('close')
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    editCurrent (currentIndex) {
      this.currentIndex = currentIndex
      this.$nextTick(_ => {
        this.$refs.saveCurrentInput[0].$refs.input.focus()
      })
    },
    handleInputConfirm () {
      if (this.inputValue !== '') {
        const url = this.$route.meta.api.addGiftCategory
        const item = {
          name: this.inputValue
        }
        this.list.push(item)
        this.axios.post(url, item).then(res => {
          if (res.data.code === 0) {
            this.$emit('getGiftCate')
          }
        })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleCurrentConfirm () {
      if (this.currentValue !== '') {
        const url = this.$route.meta.api.editGiftCategory
        const item = this.list[this.currentIndex]
        item.name = this.currentValue
        this.axios.post(url, item).then(res => {
          if (res.data.code === 0) {
            this.$emit('getGiftCate')
          }
        })
      }
      this.currentIndex = -1
      this.currentValue = ''
    }
  },
  watch: {
    cateList (val) {
      this.list = JSON.parse(JSON.stringify(val))
    }
  }
}
