<template>
  <div class="popupManager">
    <transition name="popup">
      <Notification
        v-if="showPopup"
        class="popup-item"
        :popup="true"
        :notification="notification"
        :bus="bus"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AdzuNotification } from "@/models/AdzuNotification";
import { Component, Prop } from "vue-property-decorator";
import Notification from "@/components/Notification.vue";

@Component({
  components: {
    Notification
  }
})
export default class NotificationPopupManager extends Vue {
  @Prop()
  public readonly bus?: Vue;

  notification?: AdzuNotification;

  showPopup: boolean = false;
  timeout = 0;

  mounted() {
    if (this.bus) {
      this.bus.$on("popup", this.displayPopup);
      this.bus.$on("closePopup", this.closePopup);
    }
  }

  detroyed() {
    if (this.bus) {
      this.bus.$off("popup", this.displayPopup);
      this.bus.$off("closePopup", this.closePopup);
    }
  }

  closePopup() {
    console.log("closing popup");
    this.notification = undefined;
    this.showPopup = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  displayPopup(notification: AdzuNotification) {
    console.log("showing popup", notification.message);
    this.notification = notification;
    this.showPopup = true;
    this.timeout = setTimeout(() => {
      this.closePopup();
    }, 5000);
  }
}
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: all 0.5s;
}

.popup-enter,
.popup-leave-active {
  transform: translateY(100px);
}
</style>
