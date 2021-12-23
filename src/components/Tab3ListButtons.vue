<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center">
      <ion-col>
        <ion-col size="auto" v-for="(item, index) of sortedItems" :key="index">
          <ion-row class="ion-justify-content-center">
            <ion-col size="auto">
              <!-- <tag-updated-date
                :propDate="item[0].updatedDate"
              ></tag-updated-date> -->
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-center card-row-container">
            <ion-col size="12">
              <ion-item-sliding
                v-for="(ingredient, index) in item || []"
                :key="index"
              >
                <ion-item lines="none">
                  <button-item-list
                    :propFrizeId="frizeId"
                    :propIngredient="ingredient"
                    :ref="setCardRef"
                    :propMemoDisabled="propMemoDisabled"
                  >
                  </button-item-list>
                </ion-item>
                <ion-item-options
                  lines="none"
                  side="end"
                  class="delete-btn-container"
                >
                  <ion-button
                    type="button"
                    color="danger"
                    @click="SubmitDeleteItem(ingredient.id)"
                  >
                    <ion-icon :icon="trash"></ion-icon>
                  </ion-button>
                </ion-item-options>
              </ion-item-sliding>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-col>
    </ion-row>
  </ion-grid>
  <teleport to="body">
    <ion-modal
      :is-open="isOpenRef"
      css-class="my-custom-class"
      :swipe-to-close="true"
      @didDismiss="openModal(false)"
    >
      <Modal :title="'냉장고를 부탁해'"
        ><tab-3-modal-content
          @emitUpdatedItemsBeAdd="updatedItemsBeAdd"
        ></tab-3-modal-content
      ></Modal>
    </ion-modal>
  </teleport>
</template>
<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  onBeforeUpdate,
  reactive,
  ref,
} from "vue";
import {
  IonRow,
  IonGrid,
  IonCol,
  IonModal,
  IonButton,
  IonItem,
  IonIcon,
  IonItemOptions,
  IonItemSliding,
} from "@ionic/vue";
import ButtonItemList from "./cardButton.vue";
// import TagUpdatedDate from "./TagUpdatedDate.vue";
import Tab3ModalContent from "./Tab3ModalContent.vue";
import Modal from "./AppModal.vue";
import { FrigeType, IngredientType } from "@/types/frige";
import { useStore } from "@/store/index";
import { trash } from "ionicons/icons";

export default defineComponent({
  components: {
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
    IonModal,
    ButtonItemList,
    Tab3ModalContent,
    // TagUpdatedDate,
    IonItem,
    IonIcon,
    IonItemOptions,
    IonItemSliding,
    Modal,
  },
  props: {
    propMemoDisabled: {
      type: Boolean,
      default: false,
    },
    propMode: {
      type: Boolean,
      dafault: false,
    },
  },
  setup() {
    const store = useStore(); //스토어
    const frizeId = computed(() => {
      return store.state.frige.selectedCateId;
    });
    const buttomMode = ref("nomal");
    let cardRefs: HTMLElement[] = [];
    //카드 Dom 설정
    const setCardRef = (el: any) => {
      if (el) {
        cardRefs.push(el.$el);
      }
    };
    onBeforeUpdate(() => {
      cardRefs = [];
    });

    const ArrMock: ComputedRef<FrigeType[]> = computed(() => {
      return store.state.frige.items;
    });

    const sortedItems = computed(() => {
      return store.getters["frige/fetchIngredients"];
    });
    const selectedCateId = computed(() => {
      return store.state.frige.selectedCateId;
    });
    //버튼에서 emit 을 받온다.
    const isOpenRef = ref(false);
    const openModal = (state: boolean) => (isOpenRef.value = state);
    const addItems = function (val: any) {
      openModal(true);
    };

    // 모달 데이터 emit 받아오고 업데이트 한다.
    // 확인버튼을 선택했을 때 vuex에서 ItemsBeAdd가 업데이트 된다.
    let itemsBeAdd: any = reactive([]);
    const updatedItemsBeAdd = (items: IngredientType[]) => {
      itemsBeAdd = items;
    };
    const SubmitAddItems = () => {
      openModal(false);
    };
    const SubmitDeleteItem = (itemId: string) => {
      store.dispatch("frige/frizeIngredient", {
        frizeId: selectedCateId.value,
        ingredientAdd: [],
        ingredientDelete: [itemId],
      });
    };

    return {
      ArrMock,
      buttomMode,
      sortedItems,
      isOpenRef,
      openModal,
      frizeId,
      addItems,
      updatedItemsBeAdd,
      setCardRef,
      SubmitAddItems,
      SubmitDeleteItem,
      trash,
    };
  },
});
</script>
<style lang="scss" scoped>
li {
  list-style-type: none;
}
.tab3-list-content {
  --ion-grid-columns: 6;
}
.card-row-container {
  width: 100%;
}
ion-item {
  height: 100%;
  --inner-padding-start: 0;
  --padding-start: 0;
  --inner-padding-end: 0;
  --padding-end: 0;
}
ion-item-options {
  border: none;
  ion-button {
    margin: {
      top: auto;
      bottom: auto;
      left: 16px;
    }
  }
}
.header-delete-item {
  position: fixed;
  z-index: 2;
}
.delete-footer {
  box-shadow: 0px -2px 12px 4px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  height: 46px;
  bottom: 0px;
  z-index: 3;
}
.delte-footer-button {
  font-weight: bold;
  margin: 0px;
  height: 46px;
}
</style>