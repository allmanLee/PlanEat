// /store/index.ts
import {
  Store,
  createLogger,
  createStore,
  useStore as baseUseStore
} from 'vuex';

import { InjectionKey } from 'vue';
import { UserModuleState, userModule as user } from './user';
import { FrigeModuleState, FrigeModule as frige } from "./frige";
import { UIModuleState, UIModule as ui } from "./ui";

export interface RootState {
  user: UserModuleState;
  frige: FrigeModuleState;
  ui: UIModuleState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}

export const store = createStore({
  mutations: {},
  actions: {},
  modules: {
    user, frige, ui
  },
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : undefined
});