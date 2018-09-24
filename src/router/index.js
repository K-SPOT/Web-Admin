import Vue from 'vue'
import Router from 'vue-router'
import Channel from '@/components/Channel'
import Spot from '@/components/Spot'
import Theme from '@/components/Theme'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Channel',
      component: Channel
    },
    {
      path: '/spot',
      name: 'Spot',
      component: Spot
    },
    {
      path: '/theme',
      name: 'Theme',
      component: Theme
    }
  ]
})
