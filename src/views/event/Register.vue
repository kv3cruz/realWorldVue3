<template>
   <div v-if="event">
      <p>Register for the event here</p>
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
