import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/event/Details'
import EventRegister from '../views/event/Register'
import EventEdit from '../views/event/Edit'
import EventLayout from '../views/event/Layout'
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
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      children: [
         {
            path: '',
            name: 'EventDetails',
            component: EventDetails
         },
         {
            path: 'register',
            name: 'EventRegister',
            component: EventRegister
         },
         {
            path: 'edit',
            name: 'EventEdit',
            props: true,
            component: EventEdit
         }
      ]
   }
]

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes
})

export default router
