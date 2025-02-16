import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    site: {
      site_name_cn: '',
      site_name_en: '',
      site_intro: '',
      site_abbrev: '',
      site_qq: '',
      site_email: '',
      site_weibo: '',
      site_wechat: ''
    },
    adminInfo: {
      username: '',
      id: '',
      avatar: '',
      type: ''
    }
  },
  mutations: {
    getSite (state, data) {
      state.site = data
    },
    getAdminInfo (state, data) {
      state.adminInfo = data ? {
        username: data.username,
        id: data.id,
        avatar: data.avatar,
        type: data.type
      } : {
        username: '',
        id: '',
        avatar: '',
        type: ''
      }
    }
  },
  actions: {
    getSite ({ commit }, data) {
      commit('getSite', data)
    },
    getAdminInfo ({ commit }, data) {
      commit('getAdminInfo', data)
    }
  }
})
export default store
