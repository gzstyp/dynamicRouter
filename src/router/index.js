import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Main from '@/components/Main'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'
Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login',
      leaf:true,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '404',
      leaf:true,
      hidden: true
    },
    {
      path: '/',
      component: Home,
      name: '主页',
      leaf:false,
      hidden:true,
      children: [
        {path: 'main', component: Main , name: 'main',leaf:true,hidden:false}
      ]
    }
  ]
})
