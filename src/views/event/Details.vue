<template>
   <div v-if="event">
      <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
      <p>{{ event.description }}</p>
   </div>
</template>

<script>
export default {
   props: {
      event: {
         type: Object,
         default: null
      }
   }
}
</script>
