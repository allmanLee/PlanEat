import { Module } from 'vuex';
import { RootState } from ".";

export interface FrigeModuleState {
  name: string;
  email: string;
}

export const userModule: Module<FrigeModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    name: 'hihdi',
    email: ''
  }),
  getters: {
    getName(state) {
      return state.name;
    }
  }
};