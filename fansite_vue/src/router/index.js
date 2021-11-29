import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Join from '../views/member/Join.vue'
import MyInfo from '../views/member/MyInfo.vue'
import Login from '../views/member/Login.vue'
import Logout from '../views/member/Logout.vue'

import NewsAdd from '../views/news/Add.vue'
import NewsView from '../views/news/View.vue'
import NewsList from '../views/news/List.vue'
import NewsEdit from '../views/news/Edit.vue'




const routes = [
  {
    path: '/',
    name: 'Home',
    component: Main
  },
  {
    path: '/join',
    name : 'Member Join',
    component: Join
  },
  {
    path: '/login',
    name: 'Member Login',
    component: Login
  },
  {
    path: '/logout',
    name: "Member Logout",
    component: Logout
  },
  {
    path: '/my_info',
    name: "Member MyInfo",
    component: MyInfo
  },
  {
    path: '/news/add',
    name: 'News Add',
    component: NewsAdd
  },
  {
    path: '/news/view',
    name: 'News View',
    component: NewsView
  },
  {
    path: '/news/list',
    name: 'News List',
    component: NewsList
  },
  {
    path: '/news/edit',
    name: 'News Edit',
    component: NewsEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
