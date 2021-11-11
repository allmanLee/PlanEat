//lol-request-controller
import { AuthUser, Email, RegisterUser } from "@/types/request-types/auth-request-types";
import requestApi from "./requestApi";

export default {
  /*POST
   * /api/auth/register
   * 회원가입
   */
  RegisterToEmail(reqData: RegisterUser) {
    return requestApi({
      url: "/api/auth/register",
      method: "post",
      params: reqData
    });
  },

  /*GET
   * /api/auth/check_email
   * 이메일 중복 확인
   */
  CheckEmailDuplicates(reqParams: Email) {
    return requestApi({
      url: "/api/auth/check_email",
      method: "get",
      params: JSON.stringify(reqParams),

    });
  },

  /*POST
   * /api/auth/send_auth_email
   * 인증키 이메일 보내기
   */
  SendAuthEmail(reqData: Email) {
    return requestApi({
      url: "/api/auth/send_auth_email",
      method: "post",
      data: reqData,
    });
  },

  /*POST
   * /api/auth/check_authkey
   * 인증키 확인(회원가입)
   */
  CheckAuthkey(reqData: AuthUser) {
    return requestApi({
      url: "/api/auth/check_authkey",
      method: "post",
      data: reqData
    });

  },
};
