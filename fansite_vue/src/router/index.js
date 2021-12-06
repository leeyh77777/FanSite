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

import BoardList from '../views/board/list.vue'
import BoardView from '../views/board/view.vue'
import BoardWrite from '../views/board/write.vue'
import BoardUpdate from '../views/board/update.vue'
import BoardDelete from '../views/board/delete'

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
  },
  {
    path: '/board/list',
    name: 'Board List',
    component: BoardList
  },
  {
    path: '/board/view',
    name: 'Board View',
    component: BoardView
  },
  {
    path: '/board/write',
    name: 'Board Write',
    component: BoardWrite
  },
  {
    path: '/board/update',
    name: 'Board Update',
    component: BoardUpdate
  },
  {
    path: '/board/delete',
    name: 'Board Delete',
    component: BoardDelete
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
