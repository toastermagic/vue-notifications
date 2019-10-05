<template>
  <div id="app">
    <input ref="noteMessage" type="text" v-model="noteMessage" />
    <button v-on:click="newNotification()">New</button>
    <NotificationBar />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NotificationBar from "./components/NotificationBar.vue";
import { AdzuNotification } from "@/models/AdzuNotification";
import { ADD_NOTIFICATION } from "@/models/Mutations";

export default Vue.extend({
  name: "app",
  components: {
    NotificationBar
  },
  data: function() {
    return {
      noteMessage: ""
    };
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    newNotification() {
      const newN = new AdzuNotification();
      newN.message = this.noteMessage;
      this.$store.commit(ADD_NOTIFICATION, newN);
      this.noteMessage = "";
      this.focusInput();
    },
    focusInput() {
      (<HTMLInputElement>this.$refs.noteMessage).focus();
    }
  }
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
