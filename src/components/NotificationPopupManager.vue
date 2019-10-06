<template>
  <div class="popupManager">
    <div>Iam Here</div>
    <transition name="popup">
      <NotificationPopup class="popup-item" :notification="notification" :bus="bus" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AdzuNotification } from "@/models/AdzuNotification";
import { Component, Prop } from "vue-property-decorator";
import NotificationPopup from "@/components/NotificationPopup.vue";

@Component({
  components: {
    NotificationPopup
  }
})
export default class NotificationPopupManager extends Vue {
  @Prop()
  public readonly bus?: Vue;

  @Prop()
  notification?: AdzuNotification;

  showPopup: boolean = false;

  mounted() {
    if (this.bus) {
      this.bus.$on("popup", (notification: AdzuNotification) => {
        // this.notification = notification;
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
        }, 5000);
      });
    }
  }
}
</script>

<style scoped>
.popupManager {
    height: 400px;
}
.popup-item {
  transition: all 0.5s;
}
.popup-leave-active {
  position: absolute;
}

.popup-enter-active,
.popup.leave-active {
  transition: all 0.5ms;
}
.popup-enter,
.popup-leave-to {
  transform: translateY(400px);
  background-color: blue;
}
</style>