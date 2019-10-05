<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <NotificationBar/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NotificationBar from './components/NotificationBar.vue'

export default Vue.extend({
  name: 'app',
  components: {
    NotificationBar
  }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
