import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import Detail from '@/views/Detail'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/detail',
            name: 'Detail',
            component: Detail
        }
    ]
})