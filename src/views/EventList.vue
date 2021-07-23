<template>
   <div class="events">
      <h4>Events For Good</h4>
      <img alt="Vue logo" src="../assets/logo.png" />
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      <div class="pagination">
         <router-link
            v-if="page != 1"
            id="page-prev"
            :to="{ name: 'EventList', query: { page: page - 1 } }"
            rel="prev"
            >&#60; Previous</router-link
         >

         <router-link
            v-if="hasNextPage"
            id="page-next"
            :to="{ name: 'EventList', query: { page: page + 1 } }"
            rel="next"
            >Next &#62;</router-link
         >
      </div>
   </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '../services/EventService'
//import NProgress from 'nprogress'
export default {
   name: 'EventList',
   components: {
      EventCard
   },
   beforeRouteEnter(routeTo, routeFrom, next) {
      EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
         .then((response) => {
            next((comp) => {
               comp.events = response.data
               comp.totalEvents = response.headers['x-total-count']
            })
         })
         .catch((error) => {
            console.log(error)
            next({
               name: 'NetworkError'
            })
         })
   },
   beforeRouteUpdate(routeTo) {
      return EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
         .then((response) => {
            this.events = response.data
            this.totalEvents = response.headers['x-total-count']
         })
         .catch((error) => {
            console.log(error)
            return {
               name: 'NetworkError'
            }
         })
   },
   props: {
      page: { type: String, default: '1' }
   },
   data() {
      return {
         events: null,
         totalEvents: 0
      }
   },
   computed: {
      hasNextPage() {
         var totalPages = Math.ceil(this.totalEvents / 2)
         return this.page < totalPages
      }
   }
}
</script>
<style scoped>
.events {
   display: flex;
   flex-direction: column;
   align-items: center;
}

.pagination {
   display: flex;
   width: 290px;
}
.pagination a {
   flex: 1;
   text-decoration: none;
   color: #2c3e50;
}

#page-prev {
   text-align: left;
}

#page-next {
   text-align: right;
}
</style>
