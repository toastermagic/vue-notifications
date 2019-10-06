<template>
  <div class="notificationBar">
    <hr style="width:100%" />
    <div class="dateHeading">Today</div>
    <ul>
      <transition-group name="list-transitions">
        <li v-for="note in todaysNotifications" :key="note.id" class="list-transitions-item">
          <Notification :notification="note" :bus="bus" :popup="false" />
        </li>
      </transition-group>
    </ul>
    <hr style="width:100%" />
    <div class="dateHeading">This Week</div>
    <ul>
      <transition-group name="list-transitions">
        <li v-for="note in weeksNotifications" :key="note.id" class="list-transitions-item">
          <Notification :notification="note" :bus="bus" :popup="false" />
        </li>
      </transition-group>
    </ul>
    <hr style="width:100%" />
    <div class="dateHeading">Older</div>
    <ul>
      <transition-group name="list-transitions">
        <li v-for="note in olderNotifications" :key="note.id" class="list-transitions-item">
          <Notification :notification="note" :bus="bus" :popup="false" />
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Notification from "@/components/Notification.vue";
import { AdzuNotification } from "@/models/AdzuNotification";
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

  get todaysNotifications(): AdzuNotification[] {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneDayAgo = new Date().valueOf() - oneDay;
    return this.$store.state.notificationList.filter(
      (n: AdzuNotification) => n.arrivalTime.valueOf() > oneDayAgo
    );
  }

  get weeksNotifications(): AdzuNotification[] {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneDayAgo = new Date().valueOf() - oneDay;
    const lastMonday = this.getMonday(new Date()).valueOf();
    return this.$store.state.notificationList.filter(
      (n: AdzuNotification) =>
        n.arrivalTime.valueOf() >= lastMonday &&
        n.arrivalTime.valueOf() < oneDayAgo
    );
  }

  get olderNotifications(): AdzuNotification[] {
    const lastMonday = this.getMonday(new Date()).valueOf();
    return this.$store.state.notificationList.filter(
      (n: AdzuNotification) => n.arrivalTime.valueOf() < lastMonday
    );
  }

  private getMonday(d: Date): Date {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dateHeading {
  margin-left: 20px;
  font-weight: bold;
  text-align: left;
}
.list-transitions-item {
  transition: all 0.5s;
  display: flex;
}
.list-transitions-enter {
  opacity: 0;
  transform: translateX(400px);
}
.list-transitions-leave-to {
  transform: translateX(400px);
}
.list-transitions-leave-active {
  position: absolute;
}
.list-transitions-move {
  transition: all 0.5s;
}
.notificationBar {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0px;
  top: 0px;
  background: rgba(0, 0, 255, 0.2);
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
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
