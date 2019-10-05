<template>
  <div>{{ displayFromNow }}</div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "NotificationDate",
  props: {
    date: {
      type: Date
    }
  },
  computed: {
    displayFromNow: function() {
      return moment(this.date).fromNow();
    }
  }
});
</script>

<style scoped>
</style>
