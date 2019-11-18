import './set-public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => h(App),
    router
  }
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = function (props) {
  const htmlId = `single-spa-application:${props.name}`
  const domEl = document.createElement('div')
  domEl.id = htmlId
  const singleSpaContainer = document.createElement('div')
  singleSpaContainer.className = 'single-spa-container'
  domEl.appendChild(singleSpaContainer)
  window.layx.open({
    id: props.name,
    content: {
      type: 'html',
      value: domEl
    },
    toolBar: {
      titleBar: {
        title: props.name
      },
      actionBar: {
        actionButtons: [
          {
            id: 'min',
            label: '最小化',
            handler: (ev, win) => win.min()
          },
          {
            id: 'max',
            label: '最大化',
            handler: (ev, win) => win.max()
          },
          {
            id: 'destroy',
            label: '关闭',
            handler: (ev, win) => {
              const appReg = new RegExp(`\\/${props.name}(?:\\.\\w*)*(?=\\/)*`, 'g')
              const path = router.history.current.path.replace(appReg, '')
              console.log(path)
              router.push({ path: path || '/', query: { 'routerAction': 'no-merge' } }).then(() => win.destroy())
                .catch(console.log)
            }
          }]
      }
    }
  })
  return vueLifecycles.mount(props)
}
export const unmount = vueLifecycles.unmount

