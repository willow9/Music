import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import AddBand from '../views/AddBand.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/add',
    name: 'add',
    component: AddBand
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
