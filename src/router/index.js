import Vue from 'vue'
import VueRouter from 'vue-router'
import authRoutes from '@/modules/auth/routes'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  ...authRoutes,
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/pages/homePage.vue'),
  },
  {
    path: '/upload_file',
    name: 'UploadFile',
    component: () => import('@/modules/uploadFile/pages/uploadFile.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/files',
    name: 'FileList',
    component: () => import('@/modules/uploadFile/pages/files.vue'),
    meta: {
      authRequired: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (!store.getters.authChecked) await store.dispatch('initAuthState')
  if (
    to.matched.some(
      (record) => !store.getters.loggedIn && record.meta.authRequired
    )
  )
    next({
      path: '/auth/signIn',
      query: { redirect: to.fullPath },
    })
  else next()
})

export default router
