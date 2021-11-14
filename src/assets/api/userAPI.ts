//lol-request-controller
import requestApi from "./requestApi";

export default {
  /*POST
   * /api/auth/register
   * 회원가입
   */
  SearchIngredientInFrize() {
    return requestApi({
      url: "/api/service/frize/ingredientGet",
      method: "get",
    });
  },

  /*GET
   * /api/auth/check_email
   * 이메일 중복 확인
   */
  CheckDuplicateEmail(data:) {
    return requestApi({
      url: "/api/auth/check_email",
      method: "post",
      data: data
    });
  },

  /*POST
   * /api/auth/send_auth_email
   * 인증키 이메일 보내기
   */
  SearchUserFrizes() {
    return requestApi({
      url: "/api/auth/send_auth_email",
      method: "post",
    });
  },

  /*GET
   * /api/auth/check
   * JWT 확인
   */
  AddUserFrize() {
    return requestApi({
      url: "/api/auth/check",
      method: "get",
    });
  },
};
