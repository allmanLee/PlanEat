import { Module } from 'vuex';
import { RootState } from ".";
import { FrigeType } from "@/types/frige";

export interface FrigeModuleState {
  items: FrigeType[];
  itemsBeAdd: FrigeType[];
  itemsBeDeleted: FrigeType[];

}

export const FrigeModule: Module<FrigeModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    items: [{ name: "사과", updatedDate: new Date(), amount: "충분" },
    { name: "감", updatedDate: new Date(-1), amount: "충분" },
    { name: "배추", updatedDate: new Date(-2), amount: "충분" },
    { name: "딸기", updatedDate: new Date(5), amount: "충분" },
    { name: "김치", updatedDate: new Date(-4), amount: "충분" },],

    itemsBeAdd: [],
    itemsBeDeleted: [],
  }),
  getters: {
    getItemNames(state) {
      const itemNames = state.itemsBeAdd.map((item) => {
        return item.name;
      });
      return itemNames;
    }
  },
  mutations: {
    fetchItemsBeAdd(state, payload) {
      state.itemsBeAdd = payload;
    },
    fetchItemsBeDeleted(state, { items }) {

      items.forEach((element: FrigeType) => {
        state.itemsBeDeleted.splice(state.itemsBeDeleted.indexOf(element), 1);
      });
    }
  }
};