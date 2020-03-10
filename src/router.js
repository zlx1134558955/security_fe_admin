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
          setWebsite: Api.setWebsite
        }
      }
    },
    {
      path: '/front-user',
      component: FrontUser,
      name: '前台用户',
      meta: {
        api: {
          getFrontUsers: Api.getFrontUsers,
          forbidFrontUser: Api.forbidFrontUser,
          unfreezeFrontUser: Api.unfreezeFrontUser,
          deleteFrontUser: Api.deleteFrontUser
        }
      }
    },
    {
      path: '/admin-user',
      component: AdminUser,
      name: '前台用户',
      meta: {
        api: {
          getAdminUsers: Api.getAdminUsers,
          forbidFrontUser: Api.forbidFrontUser,
          unfreezeFrontUser: Api.unfreezeFrontUser,
          deleteFrontUser: Api.deleteFrontUser,
          addAdmin: Api.addAdmin,
          forbidAdminUser: Api.forbidAdminUser,
          unfreezeAdminUser: Api.unfreezeAdminUser,
          deleteAdminUser: Api.deleteAdminUser
        }
      }
    },
    {
      path: '/post-list',
      component: PostList,
      name: '漏洞提交列表',
      meta: {
        api: {
          getPostList: Api.getPostList,
          getCategory: Api.getCategory
        }
      }
    },
    {
      path: '/post-detail',
      component: PostDetail,
      name: '漏洞详情审核',
      meta: {
        api: {
          getPostDetail: Api.getPostDetail,
          getCategoryMap: Api.getCategoryMap,
          reviewPost: Api.reviewPost,
          getPostState: Api.getPostState,
          getAttachment: Api.getAttachment
        }
      }
    },
    {
      path: '/category-manage',
      component: CategoryManage,
      name: '漏洞分类管理',
      meta: {
        api: {
          getCategoryMap: Api.getCategoryMap,
          updateCategory: Api.updateCategory
        }
      }
    },
    {
      path: '/gift-manage',
      component: GiftManage,
      name: '礼品管理',
      meta: {
        api: {
          addGift: Api.addGift,
          editGift: Api.editGift,
          getGiftCate: Api.getGiftCate,
          getGiftsList: Api.getGiftsList,
          editGiftCategory: Api.editGiftCategory,
          addGiftCategory: Api.addGiftCategory
        }
      }
    }
  ]
})
export default router
