//api를 보내기전 오류를 공통으로 처리합니다.

import { config } from "@ionic/core";
import axios from "axios";


const instance = axios.create({
  baseURL: "http://172.31.168.14:3001",
});

// 인텀셉터를 활용하여 헤더에서 accessToken을 받아오거나 기능 사용시 헤더에 accessToken을 넣어 사용한다.
instance.interceptors.request.use(function (config) {
  const acToken = localStorage.getItem("act");
  // const userInfo = sessionStorage.getItem("userAuthToken");
  // const accessToken = userInfo ? sessionStorage.getItem("userAuthToken") : null;
  config.headers = { ...config.headers, "x-access-token": acToken ? acToken : "has not accessToken" };
  return config;
});

instance.interceptors.response.use(
  function (config) {
    // 요청 성공 직전 호출됩니다.
    // this.$loading.hide();
    return config;
  },
  function (error) {
    //토큰에러시
    const err = error.response.data.message;
    //요청 에러 직전 호출됩니다.
    if (err === "jwt expired") {
      const refreshToken = localStorage.getItem("reft");
      instance({
        headers: {
          "x-refresh-token": refreshToken ? refreshToken : "has not refreshToken"
        },
        url: "/api/auth/refresh",
        method: "get"
      }).then((token) => {
        localStorage.setItem("act", token.data.accessToken);
        const newAccessToken = token.data.accessToken;
        const reRequestConfig = error.response.config;
        reRequestConfig.headers = {
          ...reRequestConfig.headers
          , "x-access-token": newAccessToken
        };
        axios.request(reRequestConfig);
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
