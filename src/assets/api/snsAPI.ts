import { AuthSNSOption } from "@/types/request-types/auth-request-types";
import requestApi from "./requestApi";
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
    }).then(data => data).catch(err => err);
  }
};
