<template>
   <div id="nav">
      <div v-if="GStore.flashMessage" id="flashMessage">
         {{ GStore.flashMessage }}
      </div>
      <router-link :to="{ name: 'EventList' }">Event List</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link>
      <router-view />
   </div>
</template>
<script>
export default {
   inject: ['GStore']
}
</script>

<style>
@keyframes yellowfade {
   from {
      background: yellow;
   }
   to {
      background: transparent;
   }
}

#flashMessage {
   animation-name: yellowfade;
   animation-duration: 3s;
   margin-bottom: 50px;
}
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
}

#nav {
   padding: 30px;
}

#nav a {
   font-weight: bold;
   color: #2c3e50;
}

#nav a.router-link-exact-active {
   color: #42b983;
}
h4 {
   font-size: 20px;
}
</style>
