import requestApi from "./requestApi";

export default {
  /*POST
   * /api/service/frize/ingredientGet
   *냉장고 재료 검색
   */
  GetIngredientData() {
    const url = '/api';
    // let queryParams = '?' + encodeURIComponent('keyId') + '=' + '897023473160409cb54f'; /*Service Key*/
    // queryParams += '&' + encodeURIComponent('serviceId') + '=' + encodeURIComponent('planeat'); /**/
    // queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /**/

    return requestApi({
      baseURL: "",
      url: url + "/897023473160409cb54f" + "/식품원재료코드" + "/json" + "/1/5",
      method: "get",
    });
  }
};
