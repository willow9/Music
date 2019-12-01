import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import AddBand from '../views/AddBand.vue'
import BandsList from '../views/BandsList.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Band from '../views/Band.vue'

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
    path: '/list',
    name: 'list',
    component: BandsList
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/band/:id',
    name: 'register',
    component: Band
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
