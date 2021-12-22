import { Module } from 'vuex';
import { RootState } from ".";
import { AlaramIngredientType, FrigeCate, FrigeType } from "@/types/frige";
import frizeAPI from "@/assets/api/frizeAPI";
import { FrizeIngreModify, FrizeOnlyEmail, FrizeOnlyId, FrizeUser, IngredientModify } from "@/types/request-types/frize-request-types";


export interface FrigeModuleState {
  frizeCate: FrigeCate[];
  selectedCateId: string;
  frizeAlaram: AlaramIngredientType[];
  items: FrigeType[];
  itemsBeAdd: FrigeType[];
  itemsBeDeleted: FrigeType[];
}

export const FrigeModule: Module<FrigeModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    items: [],
    frizeCate: [{ frizeId: "test", frizeName: "테스트" }],
    frizeAlaram: [],
    selectedCateId: "",
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
    },

    //특정 냉장고 이름만 가져오기(아이디-> 이름)
    getCateName: (state) => (id: string) => {
      return state.frizeCate.filter(el =>
        el.frizeId === id).map(el => el.frizeName).join("");
    },


    //특정 냉장고 아이디만 가져오기
    // getCateId: (state) => (id: number) => {
    //   return state.frizeCate.indexOf(id);
    // },
    //냉장고 아이디만 전체 가져오기
    getAllCateId: (state) => {
      const itemNames: string[] = [];
      state.frizeCate.forEach((item) => {
        itemNames.push(item.frizeId);
      });
      return itemNames;
    },
    fetchIngredients: (state) => {
      return state.items.reduce((acc: any, item: any): any => {
        return {
          ...acc,
          [item.updatedDate]: (acc[item.updatedDate] || []).concat(item),
        };
      }, {});
    }
  },
  mutations: {
    fetchFrizeCate(state, payload) {
      state.frizeCate = [...payload];
    },
    fetchFrizeCateAdd(state, payload) {
      state.frizeCate.push(payload);
    },
    fetchFrizeCateDelete(state, payload) {
      state.frizeCate = state.frizeCate.filter((el) => el.frizeId !== payload.frizeId);
    },
    fetchFrizeIngredients(state, payload) {
      state.items = payload;
    },
    initFrizeCateselected(state) {
      state.selectedCateId = state.frizeCate[0].frizeId;
    },
    fetchFrizeCateSelected(state, id) {
      state.selectedCateId = id;
    },
    fetchItemsBeAdd(state, payload) {
      const selectedItems: FrigeType[] = [];
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 10);


      if (payload) {
        payload.forEach((element: FrigeType) => {
          console.log(element.name);
          const ItemId = String(year) + String(month) + String(day) + element.name;
          const ItemObject: FrigeType = {
            name: element.name,
            memo: element.memo,
            amount: "보통",
            id: ItemId,
            expirationDate: `${expirationDate.getFullYear()}-${expirationDate.getMonth()}-${expirationDate.getDate()}`,
            updatedDate: `${year}-${month}-${day}`,
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
      payload.forEach((id: string) => {
        state.items.forEach((el: FrigeType) => {
          if (el.id === id) {
            selectedItems.push(el);
            state.items.splice(state.items.indexOf(el), 1);
          }
        });
      });
      state.itemsBeDeleted = selectedItems;
    },
    fetchAlaramIngredient(state, payload) {
      state.frizeAlaram = payload;
    }
  },
  actions: {
    async frizeIngredientGet(context, payload: FrizeOnlyId) {
      const reqData: FrizeOnlyId = {
        frizeId: payload.frizeId
      };
      await frizeAPI.SearchIngredientInFrize(reqData).then((res) => {
        context.commit("fetchFrizeIngredients", res.data.dataObj);
      });
    },
    async frizeIngredient(context, payload: FrizeIngreModify) {
      const reqData: FrizeIngreModify = {
        frizeId: payload.frizeId,
        ingredientAdd: payload.ingredientAdd,
        ingredientDelete: payload.ingredientDelete
      };
      await frizeAPI.ModifyIngredientInFrize(reqData).then((res) => {
        context.commit("fetchFrizeIngredients", res.data.dataObj);
      }
      ).catch((err) => { console.log(err); });
    },
    async alaramFrizeIngredientGet(context, payload: any) {
      await frizeAPI.AlaramIngredientInFrize(payload).then((res) => {
        context.commit("fetchAlaramIngredient", res.data.dataObj);
      });
    },
    async frizeIngredientModify(context, payload: IngredientModify) {
      const reqData: IngredientModify = {
        frizeId: payload.frizeId,
        ingredientId: payload.ingredientId,
        frizeModifyData: payload.frizeModifyData
      };
      await frizeAPI.ModifyIngredient(reqData).then((res) => {
        context.commit("fetchFrizeIngredients", res.data.dataObj);
      }
      ).catch((err) => { console.log(err); });
    },
    async frizeAdd(context, payload: FrizeUser) {
      const reqData = {
        email: payload.email,
        frizeName: payload.frizeName,
      };

      return await frizeAPI.AddUserFrize(reqData).then((res) =>
        context.commit("fetchFrizeCateAdd", res.data.dataObj)
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
