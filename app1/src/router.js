import Router from 'vue-router'
import Home from './views/Home.vue'

const prefix = '/:appsBefore*/app1'
const suffix = '/:appsAfter*'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: prefix + suffix,
      name: 'home',
      component: Home
    }
  ]
})
export default router
