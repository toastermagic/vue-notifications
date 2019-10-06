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
    <transition name="sidebar">
      <NotificationBar class="sidebar-item" :bus="bus" v-if="showSidebar" />
    </transition>
    <NotificationPopupManager class="notificationPopupManager" :bus="bus"/>
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

    if (!this.showSidebar) {
      this.bus.$emit("popup", newN);
    }
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

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.notificationPopupManager {
  position: absolute;
  right: 0px;
  bottom: 0px;
}

.sidebar-item {
  transition: all 0.5s;
}
.sidebar-leave-active {
  position: absolute;
}

.sidebar-enter,
.sidebar-leave-to {
  transform: translateX(200px);
}

</style>
