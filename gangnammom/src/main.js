import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import axios from 'axios'


// import 'expose-loader?$!expose-loader?jQuery!jquery'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$http = axios



new Vue({
  render: h => h(App),
}).$mount('#app')
