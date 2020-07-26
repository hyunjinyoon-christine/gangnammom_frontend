import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import axios from 'axios'
let infiniteScroll = require('vue-infinite-scroll');
import router from './router'
import Router from 'vue-router'
import Meta from 'vue-meta';
import createPersistedState from 'vuex-persistedstate';




// import 'expose-loader?$!expose-loader?jQuery!jquery'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(infiniteScroll)
Vue.use(Router)
Vue.use(Meta)



const store = () => new Vuex.Store({

  plugins: [
    createPersistedState()
  ],
  state: {
    post:null    
  },
  mutations: {
    currentPost(state, post) {
        state.post = post;
      }
  },
  actions: {
    setPost({commit},post) {
      commit('currentPost',post)
    }
  }
})


new Vue({
  render: h => h(App),
  store: store,
  router: router,
}).$mount('#app')
