import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import NewsAdd from '../views/news/Add.vue'
import NewsView from '../views/news/View.vue'
import NewsList from '../views/news/List.vue'
import NewsEdit from '../views/news/Edit.vue'
import NewsTest from '../views/news/test.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/news/test',
    name: 'News Test',
    component: NewsTest
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
