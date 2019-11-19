import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import AddBand from '../views/AddBand.vue'
import FormSubmitter from '../views/FormSubmitter.vue'

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
    component: FormSubmitter
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
