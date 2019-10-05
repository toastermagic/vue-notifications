import Vue from "vue";
import Vuex from "vuex";
import { AdzuNotification } from "@/models/AdzuNotification";
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, MARK_AS_READ } from "@/models/Mutations";

Vue.use(Vuex);

const notificationList: AdzuNotification[] = [];

interface INotificationStoreState {
  notificationList: AdzuNotification[];
}

const storeList: AdzuNotification[] = [];

export default new Vuex.Store({
  state: {
    notificationList: storeList
  },
  mutations: {
    [ADD_NOTIFICATION](state: INotificationStoreState, newNotification: AdzuNotification): void {
      state.notificationList.push(newNotification);
    },
    [REMOVE_NOTIFICATION](state: INotificationStoreState, notification: AdzuNotification): void {
      state.notificationList.splice(state.notificationList.findIndex((n) => n.id === notification.id), 1);
    },
    [MARK_AS_READ](state: INotificationStoreState, notification: AdzuNotification): void {
      const note: AdzuNotification | undefined = state.notificationList.find((n) => n.id === notification.id);
      if (!note) {
        return;
      }
      note.read = true;
    },
  },
  actions: {
    [ADD_NOTIFICATION]({ commit }: any, newNotification: AdzuNotification): void {
      commit(ADD_NOTIFICATION, newNotification);
    },
    [REMOVE_NOTIFICATION]({ commit }: any, notification: AdzuNotification): void {
      commit(REMOVE_NOTIFICATION, notification);
    },
    [MARK_AS_READ]({ commit }: any, notification: AdzuNotification): void {
      commit(MARK_AS_READ, notification);
    },
  }
});
