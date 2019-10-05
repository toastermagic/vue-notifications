<template>
  <div>{{ displayFromNow }}</div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NotificationDate extends Vue {
  @Prop({ default: new Date() })
  public readonly date?: Date;

  get displayFromNow(): string {
    if (this.date) {
      return moment(this.date).fromNow();
    }
    return "";
  }
}
</script>

<style scoped>
</style>
