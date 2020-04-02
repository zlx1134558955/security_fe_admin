import MAP from '@/assets/map/map.js'
export default {
  data () {
    return {
      list: [],
      map: MAP,
      pageSize: 10,
      pageList: [10, 20, 30, 40],
      currentPage: 1,
      status: -1,
      title: '',
      total: 0,
      typeMap: {
        1: 'info',
        2: 'success',
        3: 'warning',
        4: 'danger'
      },
      statusList: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 1,
          label: '审核中'
        },
        {
          value: 2,
          label: '已忽略'
        },
        {
          value: 3,
          label: '已确认'
        },
        {
          value: 4,
          label: '已修复'
        },
        {
          value: 5,
          label: '已完成'
        }
      ],
      category: [],
      cate_id_arr: [-1, -1]
    }
  },
  computed: {
    cate_id () {
      return this.cate_id_arr[1]
    }
  },
  methods: {
    getPostList () {
      const url = this.$route.meta.api.postList
      const form = {
        status: this.status,
        title: this.title,
        cate_id: this.cate_id,
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
    getCategory () {
      const url = this.$route.meta.api.category
      this.axios.get(url).then(res => {
        if (res.data.code === 0) {
          this.handleCategoryTree(res.data.data)
        }
      })
    },
    handleCategoryTree (result) {
      const list = []
      for (const bug of result) {
        if (bug.pid === 0) {
          list.push(bug)
        }
      }
      const arr = []
      list.forEach(item => {
        const obj = {
          value: item.id,
          label: item.name,
          children: []
        }
        arr.push(obj)
        for (const newItem of result) {
          if (newItem.pid === item.id) {
            const bug = {
              value: newItem.id,
              label: newItem.name
            }
            obj.children.push(bug)
          }
        }
      })
      this.category = arr
      this.category.unshift({ value: -1, label: '全部', children: [{ value: -1, label: '全部' }] })
    },
    getCateName (id) {
      const arr = this.category
      let ret
      arr.some(item => {
        let flag = false
        item.children.some(cate => {
          if (cate.value === id) {
            ret = cate.label
            flag = true
            return true
          }
        })
        if (flag) return true
      })
      return ret
    },
    review (id) {
      this.$router.push(`/post-detail?id=${id}`)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getPostList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getPostList()
    }
  },
  created () {
    this.getPostList()
    this.getCategory()
  }
}
