<template>
  <div class="noteCard">
    <div class="noteContainer">
      <div class="noteDate">
        <NotificationDate :date="notification.arrivalTime" :key="refreshKey" />
      </div>
      <div class="noteMessage">{{ notification.message }}</div>
      <button v-on:click="removeNote()" class="removeButton">X</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import NotificationDate from "@/components/NotificationDate.vue";
import { REMOVE_NOTIFICATION } from "@/models/Mutations";
import moment from "moment";

@Component({
  components: {
    NotificationDate
  }
})
export default class Notification extends Vue {
  @Prop()
  public readonly notification: any;

  @Prop()
  public readonly bus?: Vue;

  refreshKey = 0;

  mounted() {
    if (this.bus) {
      this.bus.$on("refresh", this.forceReRenderTime);
    }
  }
  destroyed() {
    // do this, otherwise events will still be caught
    if (this.bus) {
      this.bus.$off("refresh", this.forceReRenderTime);
    }
  }
  removeNote() {
    this.$store.commit(REMOVE_NOTIFICATION, this.notification);
  }
  forceReRenderTime() {
    // changing the key forces the child component to be re-rendered (with updated time since)
    this.refreshKey += 1;
  }
}

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

.noteDate {
  font-size: 0.8rem;
}
</style>
