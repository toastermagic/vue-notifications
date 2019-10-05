<template>
    <Notification :notification="notification" :bus="bus" />
</template>

<script lang="ts">
import Vue from "vue";
import { AdzuNotification } from "@/models/AdzuNotification";
import { Component, Prop } from "vue-property-decorator";
import NotificationDate from "@/components/NotificationDate.vue";

@Component({
    components: {
        NotificationDate
    }
})
export default class NotificationPopup extends Vue {
    @Prop()
    public notification?: AdzuNotification;

    @Prop()
    public readonly bus?: Vue;
}
</script>