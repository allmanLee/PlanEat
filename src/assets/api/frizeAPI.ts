//lol-request-controller
import { FrizeIngreModify, FrizeOnlyEmail, FrizeOnlyId, FrizeUser, IngredientModify } from "@/types/request-types/frize-request-types";
import requestApi from "./requestApi";

export default {
  /**POST
   * /api/service/frize/ingredientGet
   *냉장고 재료 검색
   */
  SearchIngredientInFrize(reqData: FrizeOnlyId) {
    return requestApi({
      url: "/api/service/frize/ingredientGet",
      method: "post",
      data: reqData
    });
  },

  /**POST
 * /api/service/frize/alaramIngredient
 *냉장고 재료 검색
 */
  AlaramIngredientInFrize(reqData: any) {
    return requestApi({
      url: "/api/service/frize/alaramIngredient",
      method: "post",
      data: reqData
    });
  },

  /**POST
   * /api/service/frize/ingredient
   *냉장고 재료 추가 및 삭제
   */
  ModifyIngredientInFrize(reqData: FrizeIngreModify) {
    return requestApi({
      url: "/api/service/frize/ingredient",
      method: "post",
      data: reqData
    });
  },

  /**POST
 * /api/service/frize/ingredient
 *냉장고 재료 수정
 */
  ModifyIngredient(reqData: IngredientModify) {
    return requestApi({
      url: "/api/service/frize/ingredientModify",
      method: "post",
      data: reqData
    });
  },

  /**POST
   * /api/service/frize/AllFrizeGet
   *유저 냉장고 검색
   */
  SearchUserFrizes(reqData: FrizeOnlyEmail) {
    return requestApi({
      url: "/api/service/frize/AllFrizeGet",
      method: "post",
      data: reqData,
    });
  },

  /**POST
   * /api/service/frize/frizeAdd
   *유저 냉장고 추가
   */
  AddUserFrize(reqData: FrizeUser) {
    return requestApi({
      url: "/api/service/frize/frizeAdd",
      method: "post",
      data: reqData,
    });
  },

  /**Delete
   * /api/service/frize/frizeDelete
   *유저 냉장고 삭제
   */
  DeleteUserFrize(reqData: FrizeUser) {
    return requestApi({
      url: "/api/service/frize/frizeDelete",
      method: "delete",
      data: reqData,
    });
  },
};
