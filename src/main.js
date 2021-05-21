import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// import router from './router'
// import store from './store'
import router from './testRouter'
import store from './textStore'


Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
