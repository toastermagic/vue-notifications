<template>
  <div id="app">
    <div class="container">
      <form @submit.prevent="newNotification">
        <div>
          <input ref="noteMessage" type="text" v-model="noteMessage" />
        </div>
        <div>
          <button>New</button>
        </div>
      </form>
      <div>
        <button @click="createMany()">Create set</button>
      </div>
      <div>
        <button @click="toggleSidebar()">Toggle</button>
      </div>
    </div>
    <NotificationBar class="sidebar-item" :bus="bus" />
    <NotificationPopupManager class="notificationPopupManager" :bus="bus" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NotificationBar from "./components/NotificationBar.vue";
import NotificationPopupManager from "./components/NotificationPopupManager.vue";
import { AdzuNotification } from "@/models/AdzuNotification";
import { TOGGLE_SIDEBAR, ADD_NOTIFICATION } from "./models/Mutations";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: { NotificationBar, NotificationPopupManager }
})
export default class app extends Vue {
  noteMessage = "";
  bus = new Vue();
  showPopup = false;
  newNotifcation: AdzuNotification | undefined = undefined;

  mounted() {
    this.focusInput();
  }
  newNotification() {
    const newN = new AdzuNotification(this.noteMessage);
    this.$store.commit(ADD_NOTIFICATION, newN);

    this.noteMessage = "";
    this.focusInput();

    if (!this.showSidebar) {
      this.bus.$emit("popup", newN);
    }
  }
  focusInput() {
    const input = this.$refs.noteMessage as HTMLInputElement;
    input.focus();
  }
  toggleSidebar() {
    this.$store.dispatch(TOGGLE_SIDEBAR);
  }
  createMany() {
    for (var x = 22; x >= 0; x -= 2) {
      const newN = new AdzuNotification(`message-a-${x}`, this.hoursAgo(x));
      this.$store.dispatch(ADD_NOTIFICATION, newN);
    }

    for (var x = 12; x >= 1; x--) {
      const newN = new AdzuNotification(`message-b-${x}`, this.daysAgo(x));
      this.$store.dispatch(ADD_NOTIFICATION, newN);
    }
  }
  hoursAgo(numHours: number) {
    return new Date(new Date().valueOf() - numHours * 60 * 60 * 1000);
  }
  daysAgo(numDays: number) {
    return new Date(new Date().valueOf() - numDays * 24 * 60 * 60 * 1000);
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
</style>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.container {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: var(--primary-color);
}

.notificationPopupManager {
  position: absolute;
  right: 0px;
  bottom: 0px;
}
</style>
