<template>
  <Navbar />
  <router-view/>
  <!-- LEARN LAZY LOADING COMPONENTS -->
</template>


<script>
import Navbar from './components/Navbar.vue'
export default {
  components: { Navbar }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
button:hover{
  background: #ce6e00;
  cursor: pointer;
}

</style>
