<template>
  <div class="notificationBar">
    <ul class="notificationList">
      <transition-group name="list-transitions">
        <li v-for="note in notificationList" :key="note.id" class="list-transitions-item">
          <Notification :notification="note" :bus="bus" />
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Notification from "@/components/Notification.vue";
import { AdzuNotification } from "@/models/AdzuNotification";
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "@/models/Mutations";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    Notification
  }
})
export default class NotificationBar extends Vue {
  @Prop()
  public readonly bus?: Vue;

  interval = 0;

  mounted() {
    // if we don't call this, the 'a few seconds ago' message won't update
    console.log("setting refresh timer for notifications");
    this.interval = setInterval(() => {
      if (this.bus) {
        this.bus.$emit("refresh");
      }
    }, 6000);
  }

  destroyed() {
    console.log("destroying");
    if (this.interval) {
      // clean up the interval timer
      console.log("removing timer");
      clearTimeout(this.interval);
    }
  }

  get notificationList(): AdzuNotification[] {
    return this.$store.state.notificationList;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .sidebar {
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(0%, 50%);
  -ms-transform: translate(-0%, 50%);
  height: 100%;
} */
.list-transitions-item {
  transition: all 0.5s;
  display: flex;
}
.list-transitions-enter {
  opacity: 0;
  transform: translateY(100vh);
}
.list-transitions-leave-to {
  transform: translateX(400px);
}
.list-transitions-leave-active {
  position: absolute;
}
.list-transitions-move {
  transition: all 0.3s;
}
.notificationBar {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0px;
  top: 0px;
  background: rgba(0, 0, 255, 0.2);
  height: 100vh;
  overflow: hidden;
  width: 220px;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  display: inline-block;
  margin: 10px;
}
a {
  color: #42b983;
}
</style>
