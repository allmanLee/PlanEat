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
    items: [{ id: "apple20210902", name: "사과", engName: "apple", updatedDate: new Date(), amount: "충분" },
    { id: "persimmon20210902", name: "감", updatedDate: new Date(-1), amount: "충분" },
    { id: "cabbage20210904", name: "배추", updatedDate: new Date(-2), amount: "충분" },
    {
      id: "strawberry20210904", name: "딸기", updatedDate: new Date(5), amount: "충분"
    },
    { id: "kimchi20210906", name: "김치", updatedDate: new Date(-4), amount: "충분" },],

    itemsBeAdd: [],
    itemsBeDeleted: [],
  }),
  getters: {
    getItemName: (state) => {
      const itemNames: string[] = [];
      state.itemsBeAdd.forEach((item) => {
        itemNames.push(item.name);
      });
      return itemNames;
    }
  },
  mutations: {
    fetchItemsBeAdd(state, payload) {
      const selectedItems: FrigeType[] = [];
      const date = new Date();
      const year = date.getFullYear;
      const month = date.getMonth;
      const day = date.getDay;

      if (payload) {
        payload.forEach((element: FrigeType) => {
          const ItemId = String(year) + String(month) + String(day) + element.engName;

          selectedItems.push({
            name: element.name,
            amount: "보통",
            id: ItemId
          });
        });
        state.itemsBeAdd = selectedItems;
      } else {
        return;
      }

    },
    fetchItemsBeDeleted(state, { items }) {
      items.forEach((element: FrigeType) => {
        state.itemsBeDeleted.splice(state.itemsBeDeleted.indexOf(element), 1);
      });
    }
  }
};