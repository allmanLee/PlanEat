//lol-request-controller
import { AuthUser, Email, RegisterUser } from "@/types/request-types/auth-request-types";
import requestApi from "./requestApi";

export default {
  /*POST
 * /api/auth/register
 * 회원가입
 */
  LoginToEmail(data: RegisterUser) {
    return requestApi({
      url: "/api/auth/login",
      method: "post",
      data: data
    });
  },
  /*POST
   * /api/auth/register
   * 회원가입
   */
  RegisterToEmail(data: RegisterUser) {
    return requestApi({
      url: "/api/auth/register",
      method: "post",
      data: data
    });
  },

  /*GET
   * /api/auth/check_email
   * 이메일 중복 확인
   */
  CheckDuplicateEmail(data: Email) {
    return requestApi({
      url: "/api/auth/check_email",
      method: "get",
      params: data
    });
  },

  /*POST
   * /api/auth/send_auth_email
   * 인증키 이메일 보내기
   */
  SendAuthEmail(data: Email) {
    return requestApi({
      url: "/api/auth/send_auth_email",
      method: "post",
      data: data
    });
  },

  /*GET
   * /api/auth/check_authkey
   * 인증키 확인
   */
  CheckAuthKey(data: AuthUser) {
    return requestApi({
      url: "/api/auth/check_authkey",
      method: "post",
      data: data
    });
  },
};
