<template>
  <div v-if="notification">
    <Notification class="popup-item" :notification="notification" :bus="bus" />
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
export default class NotificationPopup extends Vue {
  @Prop()
  public notification?: AdzuNotification;

  @Prop()
  public readonly bus?: Vue;
}
</script>

<style scoped>
</style>