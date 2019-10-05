<template>
  <div id="app">
    <form v-on:submit.prevent="newNotification">
      <div>
        <input ref="noteMessage" type="text" v-model="noteMessage" />
      </div>
      <div>
        <button>New</button>
      </div>
    </form>
    <button v-on:click="toggleSidebar()">Toggle</button>
    <NotificationBar :bus="bus" v-if="showSidebar" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NotificationBar from "./components/NotificationBar.vue";
import { AdzuNotification } from "@/models/AdzuNotification";
import { TOGGLE_SIDEBAR, ADD_NOTIFICATION } from "./models/Mutations";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: { NotificationBar }
})
export default class app extends Vue {
  noteMessage = "";
  bus = new Vue();

  get showSidebar() {
    return this.$store.state.sidebarOpen;
  }
  mounted() {
    this.focusInput();
  }
  newNotification() {
    const newN = new AdzuNotification(this.noteMessage);
    this.$store.commit(ADD_NOTIFICATION, newN);

    this.noteMessage = "";
    this.focusInput();
  }
  focusInput() {
    const input = this.$refs.noteMessage as HTMLInputElement;
    input.focus();
  }
  toggleSidebar() {
    this.$store.commit(TOGGLE_SIDEBAR);
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
