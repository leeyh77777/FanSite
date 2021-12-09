import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Join from '../views/member/Join.vue'
import MyInfo from '../views/member/MyInfo.vue'
import Login from '../views/member/Login.vue'
import Logout from '../views/member/Logout.vue'

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
    component: () => import(/* webpackChunkName: "News Add" */ "../views/news/Add.vue"),
  },
  {
    path: '/news/view',
    name: 'News View',
    component: () => import(/* webpackChunkName: "News View" */ "../views/news/View.vue"),
  },
  {
    path: '/news/list',
    name: 'News List',
    component: () => import(/* webpackChunkName: "News List" */ "../views/news/List.vue"),
  },
  {
    path: '/news/edit',
    name: 'News Edit',
    component: () => import(/* webpackChunkName: "News Edit" */ "../views/news/Edit.vue"),
  },
  {
    path: '/board/add',
    name: 'Board Add',
    component: () => import(/* webpackChunkName: "Board Add" */ "../views/board/Add.vue"),
  },
  {
    path: '/board',
    name: 'Board List',
    component: () => import(/* webpackChunkName: "Board List" */ "../views/board/List.vue"),
  },
  {
    path: '/board/view',
    name: 'Board View',
    component: () => import(/* webpackChunkName: "Board View" */ "../views/board/View.vue"),
  },
  {
    path: '/board/edit',
    name: 'Board Edit',
    component: () => import(/* webpackChunkName: "Board Edit" */ "../views/board/Edit.vue"),
  },
  {
    path: '/board/delete',
    name: 'Board Delete',
    component: () => import(/* webpackChunkName: "Board Delete" */ "../views/board/Delete.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
