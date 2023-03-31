import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Login from "../views/Login.vue"
import Main from "../views/Main.vue"
import { useUserinfoStore } from '../stores/userinfo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/main',
      name: 'main',
      component: Main,
      redirect: '/main/home',
      children: [{
        path: "home",
        name: "home",
        component: Home
      }, {
        path: "account",
        name: "account",
        component: Account
      }]
    }
  ]
})

router.beforeEach((to) => {
  if (to.name != "login") {
    const userinfo = useUserinfoStore();
    if (!userinfo.logined) {
      return '/login'
    }
  }
})

export default router
