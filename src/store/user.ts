import { Module } from 'vuex';
import { RootState } from ".";
import userAPI from "@/assets/api/userAPI";
import { AuthUser, Email, RegisterUser } from "@/types/request-types/auth-request-types";

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
      return state.name;
    }
  },
  mutations: {
  },
  actions: {
    //회원가입 (이메일)
    async RegisterToEmail(context, payload: RegisterUser) {
      const reqData = payload;
      const res = await userAPI.RegisterToEmail(reqData);
      console.log(res);
    },

    //이메일 중복 확인
    async CheckEmail(context, payload: Email) {
      const reqParams = payload;
      const res = await userAPI.CheckDuplicateEmail(reqParams);
      console.log(res);
    },

    //인증키 이메일 보내기
    async SendAuthEmail(context, payload: Email) {
      const reqData = payload;
      const res = await userAPI.SendAuthEmail(reqData);
    },

    //인증키 확인 (회원가입)
    async CheckAuthkey(context, payload: AuthUser) {
      const reqData = payload;
      const res = await userAPI.CheckAuthKey(reqData);
      console.log(res);
    }
  }
};