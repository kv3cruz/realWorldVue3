import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/event/Details'
import EventRegister from '../views/event/Register'
import EventEdit from '../views/event/Edit'
import EventLayout from '../views/event/Layout'
import NotFound from '../views/NotFound'
import NetworkError from '../views/NetworkError'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import GStore from '@/store'
const routes = [
   {
      path: '/',
      name: 'EventList',
      component: EventList,
      props: (route) => ({ page: parseInt(route.query.page) || 1 })
   },
   {
      path: '/:notFoundAll(.*)',
      name: 'NotFound',
      component: NotFound
   },
   {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
   },
   {
      path: '/networkError',
      name: 'NetworkError',
      component: NetworkError,
      props: true
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
      path: '/events/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      beforeEnter: (to) => {
         return EventService.getEvent(to.params.id)
            .then((response) => {
               GStore.event = response.data
            })
            .catch((error) => {
               console.log(error)
               if (error.response && error.response.status == 404) {
                  return {
                     name: '404Resource',
                     params: { resource: 'event' }
                  }
               } else {
                  return {
                     name: 'NetworkError'
                  }
               }
            })
      },
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
   },
   {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
         return { path: '/events/' + to.params.afterEvent }
      }
   }
]

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
   scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
         return savedPosition
      } else {
         return { top: 0 }
      }
   }
})

router.beforeEach(() => {
   NProgress.start()
})
router.afterEach(() => {
   NProgress.done()
})

export default router
