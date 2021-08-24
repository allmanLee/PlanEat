import { mount, shallowMount } from "@vue/test-utils";
import ButtonItemList from "../ButtonItemList.vue";

describe("mode에 따른 버튼의 함수 실행", function () {
  describe("addActive 상태", function () {
    test("EMIT: callAddItem", () => {});
    test("class반환", () => {});
    test("EMIT: callShowSelectModal", () => {});
  });

  describe("disable 상태", function () {
    test("버튼 클릭시 ButtonAcitvie 상태 toggle");
    test("ButtonActive에 따른 class반환", () => {});
  });

  describe("removed 상태", function () {
    test("EMIT: callRemoveButton", () => {});
    test("버튼 클릭시 ButtonAcitvie 상태 toggle", () => {});
    test("class반환", () => {});
  });

  describe("removeAcitve 상태", function () {
    test("버튼 클릭시 ButtonAcitvie 상태 toggle", () => {});
    test("class반환", () => {});
    test("EMIT: callRemoveButton");
  });
});
