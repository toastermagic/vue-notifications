<template>
  <div>
    <input type="text" v-model="noteMessage" />
    <button v-on:click="newNotification()">New</button>
    <div class="notificationBar">
      <ul class="notificationList">
        <li v-for="note in notificationList" v-bind:key="note.id">
          <Notification v-bind:notification="note" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AdzuNotification } from "../models/AdzuNotification";
import { ADD_NOTIFICATION } from "@/models/Mutations";
import Notification from "@/components/Notification.vue";

export default Vue.extend({
  components: {
    Notification
  },
  data: function() {
    return {
      noteMessage: ""
    };
  },
  name: "NotificationBar",
  computed: {
    notificationList() {
      return this.$store.state.notificationList;
    }
  },
  methods: {
    newNotification() {
      const newN = new AdzuNotification();
      newN.message = this.noteMessage;
      this.$store.commit(ADD_NOTIFICATION, newN);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notificationList {
  display: flex;
  flex-direction: column;
}
.notificationBar {
  position: absolute;
  right: 0px;
  top: 0px;
  background: blue;
  height: 100%;
  margin-right: 10px;
  align-content: flex-start;
  align-items: flex-start;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
