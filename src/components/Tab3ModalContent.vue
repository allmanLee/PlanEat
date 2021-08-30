<template>
  <ion-header translucent>
    <ion-searchbar
      @input="searchInput"
      placeholder="재료를 검색하세요"
      animated
      @ionClear="clearSearch"
      @ionFocus="focusSearch"
      @ionBlur="blurSearch"
    ></ion-searchbar>
    <tab-3-search-item-chips
      :propAddItems="searchedItem"
      @emitCancleItem="cancleChip"
    ></tab-3-search-item-chips>
  </ion-header>
  <ion-content fullscreen>
    <ion-list ref="searchList">
      <ion-button
        class="list-button"
        fill="solid"
        expand="full"
        v-for="(item, index) in ArrMock"
        :key="index"
        @click="clickItem"
        :value="item"
        :ref="buttonItem"
        >{{ item }}
      </ion-button>
    </ion-list>
  </ion-content>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onUpdated,
  reactive,
  onBeforeUpdate,
  onMounted,
  readonly,
  isReactive,
  toRefs,
} from "vue";
import Tab3SearchItemChips from "./Tab3SearchItemChips.vue";
import { VueEvent } from "@/types/index.js";
import {
  IonContent,
  IonList,
  IonButton,
  IonSearchbar,
  IonHeader,
} from "@ionic/vue";
export default defineComponent({
  components: {
    Tab3SearchItemChips,
    IonContent,
    IonList,
    IonButton,
    IonSearchbar,
    IonHeader,
  },
  setup() {
    const ArrMock = [
      "Arthur",
      "Augustin",
      "Bibiane",
      "Bernice",
      "Brooke",
      "Chloe",
      "Freeman",
    ];
    let searchList = ref();
    onUpdated(() => {
      searchList = ref();
    });

    const searchInput = (event: VueEvent.Input<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      const test = Array.from(searchList.value.children);
      test.forEach((item: any) => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? "block" : "none";
      });
    };

    const clearSearch = () => {
      const test = Array.from(searchList.value.children);
      test.forEach((item: any) => {
        item.style.display = "block";
      });
    };

    const focusSearch = (event: VueEvent.Input<HTMLInputElement>) => {
      event.target.placeholder = "";
    };

    const blurSearch = (event: any) => {
      event.target.placeholder = "재료를 검색하세요";
    };

    const searchedItem: any = reactive([]);
    const clickItem = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      event.target.style.opacity = "0.26";
      event.target.disabled = true;
      searchedItem.push(event.target.innerHTML);
    };

    let buttonItemRefs: any[] = [];
    const buttonItem = (el: any) => {
      buttonItemRefs.push(el);
    };
    onBeforeUpdate(() => {
      buttonItemRefs = [];
    });
    onMounted(() => {
      console.log(buttonItemRefs);
    });
    const cancleChip = (val: any) => {
      // const selectedCancleButton = Array.from(buttonItemRefs).filter(
      //   (el) => {}
      // );

      //selectedCancleButton[0].style.opacity = "1";
      // selectedCancleButton.disabled = false;
      searchedItem.pop(val);
    };

    return {
      ArrMock,
      searchList,
      searchInput,
      clearSearch,
      focusSearch,
      blurSearch,
      searchedItem,
      clickItem,
      cancleChip,
      buttonItem,
      buttonItemRefs,
    };
  },
});
</script>
<style lang="scss" scoped>
.list-button {
  --background: white;
}
.list-button:active {
  --background: white;
}
.list-button-checked {
  --background: white;
}
</style>