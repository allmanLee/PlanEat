import { mount, shallowMount } from "@vue/test-utils";
import AppHeader from "../AppHeader.vue";

describe("props.headerTitle 받아서 title에 출력", function () {
  test("title 출력", () => {
    const wrapper = mount(AppHeader);
    expect(wrapper.html).toContain("tem");
  });
});
