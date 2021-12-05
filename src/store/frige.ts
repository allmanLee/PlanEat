import { Module } from 'vuex';
import { RootState } from ".";
import { FrigeCate, FrigeType } from "@/types/frige";
import frizeAPI from "@/assets/api/frizeAPI";
import { FrizeIngreModify, FrizeOnlyEmail, FrizeOnlyId, FrizeUser } from "@/types/request-types/frize-request-types";


export interface FrigeModuleState {
  frizeCate: FrigeCate[];
  items: FrigeType[];
  itemsBeAdd: FrigeType[];
  itemsBeDeleted: FrigeType[];
}


export const FrigeModule: Module<FrigeModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    items: [{ id: "20210902apple", name: "사과", engName: "apple", updatedDate: new Date(), amount: "충분" },
    { id: "20210902persimmon", name: "감", updatedDate: new Date(-1), amount: "충분" },
    { id: "20210904cabbage", name: "배추", updatedDate: new Date(-2), amount: "충분" },
    {
      id: "20210904strawberry", name: "딸기", updatedDate: new Date(5), amount: "충분"
    },
    { id: "20210906kimchi", name: "김치", updatedDate: new Date(-4), amount: "충분" },],
    frizeCate: [],
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
    fetchFrizeCate(state, payload) {
      state.frizeCate.push(...payload);
    },
    fetchFrizeCateDelete(state, payload) {
      state.frizeCate = state.frizeCate.filter((el) => el.frizeId !== payload.frizeId);
    },
    fetchFrizeIngredients(state, payload) {
      state.items = payload;
    },
    fetchItemsBeAdd(state, payload) {
      const selectedItems: FrigeType[] = [];
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDay();

      if (payload) {
        payload.forEach((element: FrigeType) => {
          const ItemId = String(year) + String(month) + String(day) + element.engName;
          const ItemObject: FrigeType = {
            name: element.name,
            amount: "보통",
            id: ItemId,
            updatedDate: date,
          };
          selectedItems.push(ItemObject);
          state.items.push(ItemObject);
        });
        state.itemsBeAdd = selectedItems;
      } else {
        return;
      }

    },
    fetchItemsBeDelete(state, payload) {
      const selectedItems: FrigeType[] = [];
      console.log(payload);
      payload.forEach((id: string) => {
        state.items.forEach((el: FrigeType) => {
          if (el.id === id) {
            selectedItems.push(el);
            state.items.splice(state.items.indexOf(el), 1);
          }
        });
      });
      state.itemsBeDeleted = selectedItems;
    }
  },
  actions: {
    async frizeIngredientGet(context, payload: FrizeOnlyId) {
      const reqData: FrizeOnlyId = {
        frizeId: payload.frizeId
      };
      await frizeAPI.SearchIngredientInFrize(reqData).then((res) => {
        context.commit("fetchFrizeIngredients", res.data.datObj);
      });
    },
    async frizeIngredient(context, payload: FrizeIngreModify) {
      const reqData: FrizeIngreModify = {
        email: payload.email,
        frizeName: payload.frizeName,
        ingredientAdd: null,
      };
      const res = await frizeAPI.ModifyIngredientInFrize(reqData);
    },
    async frizeAdd(context, payload: FrizeUser) {
      const reqData = {
        email: payload.email,
        frizeName: payload.frizeName,
      };

      return await frizeAPI.AddUserFrize(reqData).then((res) =>
        context.commit("fetchFrizeCate", [res.data.dataObj])
      ).catch((err) => console.log(err));
    },
    async frizeDelete(constext, payload: FrizeUser) {
      const reqData = {
        email: payload.email,
        frizeName: payload.frizeName
      };
      return await frizeAPI.DeleteUserFrize(reqData).then((res) => {
        const frizeCates = res.data.dataObj;
        constext.commit("fetchFrizeCateDelete", frizeCates);
      });
    },
    async AllFrizeGet(constext, payload: FrizeOnlyEmail) {
      const reqData = {
        email: payload.email,
      };
      return await frizeAPI.SearchUserFrizes(reqData).then((res) => {
        const frizeCates = res.data.dataObj;
        constext.commit("fetchFrizeCate", frizeCates);
      });
    }

  }
};
