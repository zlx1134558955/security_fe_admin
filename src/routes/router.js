import Vue from 'vue'
import VueRouter from 'vue-router'
import Api from 'Config/api'
import Setting from '@/routes/setting_manage/index.vue'
import FrontUser from '@/routes/user_manage/front-user/index.vue'
import AdminUser from '@/routes/user_manage/admin-user/index.vue'
import PostList from '@/routes/post_manage/index.vue'
import PostDetail from '@/routes/post_detail/index.vue'
import CategoryManage from '@/routes/category-manage/index.vue'
import GiftManage from '@/routes/gift-manage/gift-manage/index.vue'
import GiftOrder from '@/routes/gift-manage/gift-order/index.vue'
import GiftDetail from '@/routes/gift-manage/gift-detail/index.vue'
import NoticeManage from '@/routes/notice-blog/notice-manage/index.vue'
import AddNotice from '@/routes/notice-blog/add-notice/index.vue'
import EditNotice from '@/routes/notice-blog/edit-notice/index.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/setting',
      meta: {

      }
    },
    {
      path: '/setting',
      component: Setting,
      name: '站点管理',
      meta: {
        api: {
          site: Api.site
        }
      }
    },
    {
      path: '/front-user',
      component: FrontUser,
      name: '前台用户',
      meta: {
        api: {
          memberList: Api.memberList,
          member: Api.member
        }
      }
    },
    {
      path: '/admin-user',
      component: AdminUser,
      name: '管理员用户',
      meta: {
        api: {
          managerList: Api.managerList,
          manager: Api.manager
        }
      }
    },
    {
      path: '/post-list',
      component: PostList,
      name: '漏洞提交列表',
      meta: {
        api: {
          postList: Api.postList,
          category: Api.category
        }
      }
    },
    {
      path: '/post-detail',
      component: PostDetail,
      name: '漏洞详情审核',
      meta: {
        api: {
          post: Api.post,
          category: Api.category,
          postState: Api.postState,
          postAttachment: Api.postAttachment
        }
      }
    },
    {
      path: '/category-manage',
      component: CategoryManage,
      name: '漏洞分类管理',
      meta: {
        api: {
          category: Api.category
        }
      }
    },
    {
      path: '/gift-manage',
      component: GiftManage,
      name: '礼品管理',
      meta: {
        api: {
          gift: Api.gift,
          giftCategory: Api.giftCategory,
          giftList: Api.giftList
        }
      }
    },
    {
      path: '/gift-order',
      component: GiftOrder,
      name: '礼品订单',
      meta: {
        api: {
          giftOrderList: Api.giftOrderList,
          giftCategory: Api.giftCategory
        }
      }
    },
    {
      path: '/gift-detail',
      component: GiftDetail,
      name: '礼品详情',
      meta: {
        api: {
          giftOrder: Api.giftOrder
        }
      }
    },
    {
      path: '/notice-manage',
      component: NoticeManage,
      name: '公告管理',
      meta: {
        api: {
          notice: Api.notice,
          noticeList: Api.noticeList
        }
      }
    },
    {
      path: '/add-notice',
      component: AddNotice,
      name: '新增公告',
      meta: {
        api: {
          noticeInsert: Api.noticeInsert,
          notice: Api.notice
        }
      }
    },
    {
      path: '/edit-notice',
      component: EditNotice,
      name: '编辑公告',
      meta: {
        api: {
          noticeInsert: Api.noticeInsert,
          notice: Api.notice,
          noticeAttachment: Api.noticeAttachment
        }
      }
    }
  ]
})
export default router
