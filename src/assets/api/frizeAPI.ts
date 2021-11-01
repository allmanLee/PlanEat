//lol-request-controller
import requestApi from "./requestApi";

export default {
  /*POST
   * /api/service/frize/ingredientGet
   *냉장고 재료 검색
   */
  SearchIngredientInFrize() {
    return requestApi({
      url: "/api/service/frize/ingredientGet",
      method: "post",
    });
  },

  /*POST
   * /api/service/frize/ingredient
   *냉장고 재료 추가 및 삭제
   */
  ModifyIngredientInFrize() {
    return requestApi({
      url: "/api/service/frize/ingredient",
      method: "post",
    });
  },

  /*POST
   * /api/service/frize/AllFrizeGet
   *유저 냉장고 검색
   */
  SearchUserFrizes() {
    return requestApi({
      url: "/api/service/frize/AllFrizeGet",
      method: "post",
    });
  },

  /*POST
   * /api/service/frize/frizeAdd
   *유저 냉장고 추가
   */
  AddUserFrize() {
    return requestApi({
      url: "/api/service/frize/frizeAdd",
      method: "post",
    });
  },

  /*Delete
   * /api/service/frize/frizeDelete
   *유저 냉장고 삭제
   */
  DeleteUserFrize() {
    return requestApi({
      url: "/api/service/frize/frizeDelete",
      method: "delete",
    });
  },
};
