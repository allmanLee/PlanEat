import { Module } from 'vuex';
import { RootState } from ".";


export interface UIModuleState {
  footer: boolean;
  header: boolean;
  addButton: boolean;
  deletePannel: boolean;
}

export const UIModule: Module<UIModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    footer: true,
    header: true,
    addButton: true,
    deletePannel: false,

  }),
  getters: {
  },
  mutations: {
    fetchStateDelete(state) {
      state.footer = false;
      state.header = false;
      state.addButton = false;
      state.deletePannel = true;
    },
    fetchStateAdd(state) {
      state.footer = true;
      state.header = true;
      state.addButton = true;
      state.deletePannel = false;
    }
  }
};