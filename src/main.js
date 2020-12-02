import Vue from 'vue'
import App from './App.vue'
import router from "router/router.js"
import store from "store/store.js"
import axios from 'http/http.js'
import "@/mock"
import "@/common/components"
import "@/common/stylus/font.styl"
import  "@/common/stylus/transition.styl"
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
