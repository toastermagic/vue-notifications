<template>
  <div class="notificationBar">
    <ul>
      <transition-group name="list-transitions">
        <li v-for="note in notificationList" :key="note.id" class="list-transitions-item">
          <Notification :notification="note" :bus="bus" :popup="false"/>
        </li>
      </transition-group>
    </ul>
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

  get notificationList(): AdzuNotification[] {
    return this.$store.state.notificationList;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
