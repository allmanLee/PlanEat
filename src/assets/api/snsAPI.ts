import { AuthSNSOption } from "@/types/request-types/auth-request-types";
import requestApi from "./requestApi";
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
export default {
  /*POST
 * /api/auth/login
 * 로그인
 */
  ControllerSNS(data: AuthSNSOption) {
    return requestApi({
      url: "/api/auth/controllerToSNS",
      method: "post",
      data: data
    }).then((res) => {
      const exDate = new Date();
      exDate.setMinutes(exDate.getMinutes() + 20);
      localStorage.setItem("actExTime", String(exDate));
      localStorage.setItem("act", res.data.dataObj.acToken);
      localStorage.setItem("reft", res.data.dataObj.refToken);
      return res;
    }).catch(err => err);
  },

};


