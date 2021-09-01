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
        :id="`button-${item}`"
        class="list-button"
        fill="solid"
        expand="full"
        v-for="(item, index) in ArrMock || []"
        :key="index"
        @click="clickItem"
        :ref="setButtonRef"
        :value="item"
        >{{ item }}
      </ion-button>
    </ion-list>
  </ion-content>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onUpdated,
  computed,
  onBeforeUpdate,
  Ref,
  onMounted,
} from "vue";
import Tab3SearchItemChips from "./Tab3SearchItemChips.vue";
import { VueEvent } from "@/types/event.js";
import { useStore } from "@/store/index";
import {
  IonContent,
  IonList,
  IonButton,
  IonSearchbar,
  IonHeader,
} from "@ionic/vue";

export default defineComponent({
  emits: ["emitUpdatedItemsBeAdd"],
  components: {
    Tab3SearchItemChips,
    IonContent,
    IonList,
    IonButton,
    IonSearchbar,
    IonHeader,
  },

  setup(props, { emit }) {
    const store = useStore();

    const ArrMock = [
      "Arthur",
      "Augustin",
      "Bibiane",
      "Bernice",
      "Brooke",
      "Chloe",
      "Freeman",
    ];
    //ref setting/////////////////////
    let buttonRefs: HTMLElement[] = [];
    const setButtonRef = (el: any) => {
      if (el) {
        buttonRefs.push(el.$el);
      }
    };
    const searchedItem: any[] = reactive([]);
    let searchList = ref();
    onUpdated(() => {
      searchList = ref();
    });
    onBeforeUpdate(() => {
      buttonRefs = [];
    });
    ///////////////////////////////////

    // ItemNamesBeAdd에 추가된 상품이 있다면 초기 모달 회면에 표시
    const ItemNamesBeAdd = computed(() => {
      return store.getters["frige/getItemName"];
    });

    onMounted(() => {
      if (ItemNamesBeAdd.value) {
        ItemNamesBeAdd.value.forEach((element: any) => {
          searchedItem.push(element);
          buttonRefs.filter((el) => {
            if (el.getAttribute("value") === element) {
              el.style.opacity = "0.26";
              el.setAttribute("disabled", "true");
            }
          });
        });
      }
    });

    const searchInput = (event: VueEvent.Input<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      const test = searchList.value.$el;
      Array.from(test.children).forEach((item: any) => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? "block" : "none";
      });
    };

    const clearSearch = () => {
      const test = searchList.value.$el;
      Array.from(test.children).forEach((item: any) => {
        item.style.display = "block";
      });
      return 0;
    };

    const focusSearch = (event: VueEvent.Input<HTMLInputElement>) => {
      event.target.placeholder = "";
    };

    const blurSearch = (event: any) => {
      event.target.placeholder = "재료를 검색하세요";
    };

    const clickItem = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      event.target.style.opacity = "0.26";
      event.target.disabled = true;
      searchedItem.push(event.target.innerHTML);
      emit("emitUpdatedItemsBeAdd", searchedItem);
    };

    const cancleChip = (val: any) => {
      const buttonId: HTMLIonButtonElement | null = document.getElementById(
        `button-${val}`
      ) as HTMLIonButtonElement; // 선택한  버튼 dom 객체
      buttonId.style.opacity = "1";
      buttonId.setAttribute("disabled", "false");
      searchedItem.splice(searchedItem.indexOf(val), 1);
      emit("emitUpdatedItemsBeAdd", searchedItem);
    };

    return {
      ArrMock,
      buttonRefs,
      setButtonRef,
      searchList,
      searchInput,
      clearSearch,
      focusSearch,
      blurSearch,
      searchedItem, //vuex에서 관리 필요
      clickItem,
      cancleChip,
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