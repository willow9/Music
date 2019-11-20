import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import AddBand from '../views/AddBand.vue'
import BandsList from '../views/BandsList.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'about',
    component: About
  },
  {
    path: '/add',
    name: 'add',
    component: AddBand
  },
  {
    path: '/test',
    name: 'test',
    component: BandsList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
