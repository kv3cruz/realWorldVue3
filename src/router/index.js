import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/EventDetails'
const routes = [
   {
      path: '/',
      name: 'EventList',
      component: EventList,
      props: (route) => ({ page: parseInt(route.query.page) || 1 })
   },
   {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
         import(/* webpackChunkName: "about" */ '../views/About.vue')
   },
   {
      path: '/event/:id',
      name: 'EventDetails',
      props: true,
      component: EventDetails
   }
]

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes
})

export default router
