<template>
  <div id="app">
    <form v-on:submit.prevent="newNotification">
      <input ref="noteMessage" type="text" v-model="noteMessage" />
      <button>New</button>
    </form>
    <NotificationBar :bus="bus"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NotificationBar from "./components/NotificationBar.vue";
import { AdzuNotification } from "@/models/AdzuNotification";

export default Vue.extend({
  name: "app",
  components: {
    NotificationBar
  },
  data() {
    return {
      noteMessage: "",
      bus: new Vue()
    };
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    newNotification() {
      this.bus.$emit("newNotification", this.noteMessage);
      this.noteMessage = "";
      this.focusInput();
    },
    focusInput() {
      // eslint-disable-next-line
      const input = this.$refs.noteMessage as HTMLInputElement;
      input.focus();
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
