import { Module } from 'vuex';
import { RootState } from ".";


export interface UIModuleState {
  frizeEmptyImgShow: boolean;
}

export const UIModule: Module<UIModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    frizeEmptyImgShow: false
  }),
  getters: {
  },
  mutations: {

  }
};