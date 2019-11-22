import Router from 'vue-router'
import apps from './routes'

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: []
})
let redirectPath = ''
router.beforeEach((to, from, next) => {
  const fromPath = from.path
  const toPath = to.path
  if (fromPath === '/' || toPath === redirectPath) {
    redirectPath = ''
    next()
    return
  }
  const appReg = new RegExp(/\/\w*(?:\.\w*)*(?=\/)*/g)
  const pathReg = new RegExp(/(\/\w*)|(\.\w*)/g)
  const apps = []
  if (to.query.routerAction !== 'no-merge') {
    apps.push(...fromPath.match(appReg))
  }
  const reducer = apps.concat(toPath.match(appReg)).filter(item => item !== null)
    .reduce((obj, item) => {
      const path = item.match(pathReg)
      const app = path.shift()
      if (app !== '/redirect') {
        obj[app] = path.join('')
      }
      return obj
    }, {})
  const nextPath = redirectPath = Object.entries(reducer).reduce((str, [key, value]) => str += (key + value), '')
  if (nextPath !== fromPath) {
    router.replace({ path: nextPath })
  }
})
export default router
