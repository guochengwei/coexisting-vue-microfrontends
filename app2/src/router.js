import Router from 'vue-router'
import Home from './views/Home.vue'

const prefix = '/:appsBefore*/app2'
const suffix = '/:appsAfter*'
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: prefix + suffix,
      name: 'home',
      component: Home
    },
    {
      path: prefix + '.about' + suffix,
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
export default router
