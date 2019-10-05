<template>
  <div class="noteCard">
    <div class="noteContainer">{{ notification.message }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AdzuNotification } from "../models/AdzuNotification";

export default Vue.extend({
  props: ["notification"],
  name: "Notification"
});
</script>

<style scoped>
.noteCard {
  width: 200px;
  height: 100px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin: 5px 5px;
}

.noteCard:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.noteContainer {
    padding: 2px 16px;
}
</style>
