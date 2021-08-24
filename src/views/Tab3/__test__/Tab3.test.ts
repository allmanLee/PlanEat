import { mount, shallowMount } from "@vue/test-utils";
import Tab3 from "../index.vue";

describe("vuex에서 재료 데이터 가져와서 재료리스트 출력", function () {
  test("FETCH: vuex에서 재료데이터(ingredients) 가져오기", () => {
    const wrapper = shallowMount(Tab3);
  });
  //test("SHOW: 데이터 화면 에 리스트로 출력", () => {});
  //test("SHOW: TagUpadedDate 컴포넌트 출력", () => {
    //ADD: 만약 오늘날짜가 아닌 데이터가 받아온 객체에 있다면 **업데이트 데이트 태그 컴포넌트 컴포넌트 출력으로 날짜 구분**
  //});
});

describe("라우팅 및 모달", function () {
  //test("ROUTE: 라우팅", () => {});
  //test("SHOW: 모달", () => {});
});

describe("배열에서 데이터 컨트롤", function () {
  //test("ADD/DELETE: arrSelectedAdd", () => {});
  //test("ADD: arrSelectedRemove", () => {});
  //test("DELETE: arrSelectedRemove", () => {});
});
