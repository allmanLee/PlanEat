<template>
  <ion-header mode="ios">
    <ion-searchbar
      mode="ios"
      @input="searchInput"
      placeholder="재료를 검색하세요"
      animated
      @ionClear="clearSearch"
      @ionFocus="focusSearch"
      @ionBlur="blurSearch"
    ></ion-searchbar>
  </ion-header>
  <ion-content>
    <ion-list ref="searchList">
      <ion-item v-for="(item, index) in ArrMock || []" :key="index">
        <ion-button
          color="dark"
          mode="ios"
          :id="`button-${item.name}`"
          fill="clear"
          expand="full"
          @click="clickItem"
          :ref="setButtonRef"
          :value="JSON.stringify(item)"
          >{{ item.name }}
        </ion-button>
      </ion-item>
    </ion-list>
  </ion-content>
  <ion-footer mode="md">
    <div class="added-item-container">
      <h5>선택한 재료</h5>
      <tab-3-search-item-chips
        :propAddItems="selectedItems"
        @emitCancleItem="cancleChip"
      ></tab-3-search-item-chips>
      <ion-button expand="block" @click="submit()">확인</ion-button>
    </div>
  </ion-footer>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onUpdated,
  computed,
  onBeforeUpdate,
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
  IonFooter,
  IonHeader,
  IonItem,
} from "@ionic/vue";
import { IngredientType } from "@/types/frige";

export default defineComponent({
  emits: ["emitUpdatedItemsBeAdd", "emitSubmit"],
  components: {
    Tab3SearchItemChips,
    IonContent,
    IonList,
    IonButton,
    IonSearchbar,
    IonFooter,
    IonHeader,
    IonItem,
  },

  setup(props, { emit }) {
    const store = useStore();

    const ArrMock: IngredientType[] = [
      { name: "파" },
      { name: "마늘" },
      { name: "돼지고기" },
      { name: "간장" },
    ];

    //ref setting/////////////////////
    let buttonRefs: HTMLElement[] = [];
    const setButtonRef = (el: any) => {
      if (el) {
        buttonRefs.push(el.$el);
      }
    };
    const selectedItems: any[] = reactive([]);
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
      return store.state.frige.itemsBeAdd;
    });
    const submit = () => emit("emitSubmit");

    onMounted(() => {
      if (ItemNamesBeAdd.value) {
        ItemNamesBeAdd.value.forEach((element: any) => {
          selectedItems.push(element);
          buttonRefs.filter((el) => {
            const itemJsonString: string = el.getAttribute("value") as string;

            if (JSON.parse(itemJsonString).name === element.name) {
              el.style.opacity = "0.26";
              el.setAttribute("disabled", "true");
            }
          });
        });
      }
    });

    //재료 검색 기능
    //[input ,clear, focus, blur]에 해당하는 기능 동작
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

    //재료선택
    const clickItem = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      event.target.style.opacity = "0.26";
      event.target.disabled = true;
      const itemJsonString: string = event.target.getAttribute(
        "value"
      ) as string;
      selectedItems.push(JSON.parse(itemJsonString));
      emit("emitUpdatedItemsBeAdd", selectedItems);
    };
    ////////////////////

    //재료선택에서 제거
    const cancleChip = (val: any) => {
      const buttonId: HTMLIonButtonElement | null = document.getElementById(
        `button-${val.name}`
      ) as HTMLIonButtonElement; // 선택한  버튼 dom 객체
      buttonId.style.opacity = "1";
      buttonId.setAttribute("disabled", "false");
      selectedItems.splice(selectedItems.indexOf(val), 1);
      emit("emitUpdatedItemsBeAdd", selectedItems);
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
      submit,
      selectedItems, //vuex에서 관리 필요
      clickItem,
      cancleChip,
    };
  },
});
</script>
<style lang="scss" scoped>
ion-header {
  padding: {
    left: 16px;
    right: 16px;
  }
}
ion-content {
  --padding-start: 16px;
  --padding-end: 16px;
}
ion-item {
  --padding-end: 0px;
  --padding-start: 0px;
  ion-button {
    width: 100%;
    height: 48px;
    font-weight: 400;
  }
}

ion-searchbar {
  width: 100%;
  padding: 0px;
}
ion-footer {
  background: white;
  box-shadow: 0x -3px 6px rgba(0, 0, 0, 0.16%) !important;
  position: fixed;
  width: 100%;
  bottom: 0px;
  h5 {
    margin-top: 0;
  }
  .added-item-container {
    padding: 16px;
  }
  ion-button {
    margin-top: 16px;
    min-height: rem-calc(48px);
  }
}
</style>