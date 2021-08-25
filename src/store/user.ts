import { Module } from 'vuex'
import { RootState } from ".";

export interface UserModuleState {
  name: string;
  email: string;
}

export const userModule: Module<UserModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    name: 'hihdi',
    email: ''
  }),
  getters: {
    getName(state) {
      return state.name
    }
  }
}