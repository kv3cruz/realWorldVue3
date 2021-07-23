<template>
   <div v-if="event">
      <p>Register for the event here</p>
      <button @click="register">Register me</button>
   </div>
</template>

<script>
export default {
   inject: ['GStore'],
   props: {
      event: {
         type: Object,
         default: null
      }
   },
   methods: {
      register() {
         this.GStore.flashMessage =
            'You are successfully registered for ' + this.event.title
         setTimeout(() => {
            this.GStore.flashMessage = ''
         }, 3000)
         this.$router.push({
            name: 'EventDetails'
         })
      }
   }
}
</script>
