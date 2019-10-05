<template>
  <div class="noteCard">
    <div class="noteContainer">
      <div class="noteDate">
        <NotificationDate v-bind:date="notification.arrivalTime" :key="refreshKey" />
      </div>
      <div class="noteMessage">{{ notification.message }}</div>
      <button v-on:click="removeNote()" class="removeButton">X</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NotificationDate from "@/components/NotificationDate.vue";
import { AdzuNotification } from "@/models/AdzuNotification";
import { REMOVE_NOTIFICATION } from "@/models/Mutations";
import moment from "moment";

let interval = 0;

export default Vue.extend({
  name: "Notification",
  components: {
    NotificationDate
  },
    props: {
      notification: {
        type: AdzuNotification
      }
    },
  data: function() {
    return {
      refreshKey: 0
    };
  },
  created() {
    // if we don't call this, the 'a few seconds ago' message won't update
    interval = setInterval(() => {
      this.forceReRenderTime();
    }, 60000);
  },
  destroyed() {
    // clean up the interval timer
    clearTimeout(interval);
  },
  methods: {
    removeNote() {
      this.$store.commit(REMOVE_NOTIFICATION, this.notification);
    },
    forceReRenderTime() {
      // changing the key forces the child component to be re-rendered (with updated time since)
      this.refreshKey += 1;
    }
  }
});
</script>

<style scoped>
.removeButton {
  position: absolute;
  top: 10px;
  right: 10px;
}

.noteCard {
  width: 200px;
  height: 100px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background: white;
}

.noteCard:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.noteContainer {
  position: relative;
  padding: 2px 16px;
}
</style>
