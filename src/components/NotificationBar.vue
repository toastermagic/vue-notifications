<template>
  <div>
    <div class="notificationBar">
      <ul class="notificationList">
        <transition-group name="list-transitions">
          <li v-for="note in notificationList" v-bind:key="note.id" class="note-item">
            <Notification v-bind:notification="note" />
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Notification from "@/components/Notification.vue";

export default Vue.extend({
  components: {
    Notification
  },
  name: "NotificationBar",
  computed: {
    notificationList() {
      return this.$store.state.notificationList;
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.note-item {
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
.list-transitions-active {
  position: absolute;
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
