<template>
  <div class="notificationBar">
    <div v-if="this.$store.getters.todaysNotifications.length > 0">
      <hr style="width:100%" />
      <div style="display: flex">
        <div class="dateHeading">Today</div>
        <span class="spacer"></span>
        <button @click="removeToday()" style="margin-right:20px">X</button>
      </div>
      <ul>
        <transition-group name="list-transitions">
          <li v-for="note in this.$store.getters.todaysNotifications" :key="note.id" class="list-transitions-item">
            <Notification :notification="note" :bus="bus" :popup="false" />
          </li>
        </transition-group>
      </ul>
    </div>
    <div v-if="this.$store.getters.weeksNotifications.length > 0">
      <hr style="width:100%" />
      <div style="display: flex">
        <div class="dateHeading">This Week</div>
        <span class="spacer"></span>
        <button @click="removeWeek()" style="margin-right:20px">X</button>
      </div>
      <ul>
        <transition-group name="list-transitions">
          <li v-for="note in this.$store.getters.weeksNotifications" :key="note.id" class="list-transitions-item">
            <Notification :notification="note" :bus="bus" :popup="false" />
          </li>
        </transition-group>
      </ul>
    </div>
    <div v-if="this.$store.getters.olderNotifications.length > 0">
      <hr style="width:100%" />
      <div style="display: flex">
        <div class="dateHeading">Older</div>
        <span class="spacer"></span>
        <button @click="removeOlder()" style="margin-right:20px">X</button>
      </div>
      <ul>
        <transition-group name="list-transitions">
          <li v-for="note in this.$store.getters.olderNotifications" :key="note.id" class="list-transitions-item">
            <Notification :notification="note" :bus="bus" :popup="false" />
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Notification from "@/components/Notification.vue";
import { AdzuNotification } from "@/models/AdzuNotification";
import { Component, Prop, Watch } from "vue-property-decorator";
import { REMOVE_NOTIFICATION } from "@/models/Mutations";
import { TweenMax, Power4 } from "gsap";

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

    TweenMax.set(this.$el, {
      x: (<HTMLElement>this.$el).offsetWidth
    });
  }

  get open(): boolean {
    console.log(this.$store.state.sidebarOpen);
    return this.$store.state.sidebarOpen;
  }

  @Watch("open")
  openWatch(open: boolean) {
    const dX = open ? 0 : (<HTMLElement>this.$el).offsetWidth;
    TweenMax.to(this.$el, 0.6, {
      x: dX,
      ease: Power4.easeOut
    });
  }

  destroyed() {
    console.log("destroying");
    if (this.interval) {
      // clean up the interval timer
      console.log("removing timer");
      clearTimeout(this.interval);
    }
  }

  removeToday() {
    if (this.bus) {
      console.log("Removing todays notifications");
      this.$store.getters.todaysNotifications.forEach((n: AdzuNotification) => {
        this.$store.dispatch(REMOVE_NOTIFICATION, n);
      });
    }
  }

  removeWeek() {
    if (this.bus) {
      console.log("Removing weeks notifications");
      this.$store.getters.weeksNotifications.forEach((n: AdzuNotification) => {
        this.$store.dispatch(REMOVE_NOTIFICATION, n);
      });
    }
  }

  removeOlder() {
    if (this.bus) {
      console.log("Removing older notifications");
      this.$store.getters.olderNotifications.forEach((n: AdzuNotification) => {
        this.$store.dispatch(REMOVE_NOTIFICATION, n);
      });
    }
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
.spacer {
  flex: 1 1 auto;
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
  position: fixed;
  right: 0px;
  top: 0px;
  background: rgba(0, 0, 255, 0.2);
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
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
