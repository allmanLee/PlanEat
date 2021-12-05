<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center">
      <ion-col>
        <ion-col
          size="auto"
          v-for="(item, index) in sortedItems || []"
          :key="index"
        >
          <ion-row class="ion-justify-content-center">
            <ion-col size="auto">
              <!-- <tag-updated-date
                :propDate="item[0].updatedDate"
              ></tag-updated-date> -->
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-center">
            <ion-col size="12">
              <button-item-list
                v-for="(ingredient, index) in item || []"
                :key="index"
                :propIngredient="ingredient"
                :ref="setCardRef"
                :propMode="buttomMode"
                @emitDeleteItems="deleteItems"
              >
                <!-- <ion-checkbox
                  v-if="deletePannelShow"
                  @update:modelValue="checkBeCancledId(ingredient.id)"
                  :modelValue="checkBeCancledId(ingredient.id)"
                  class="checkbox-delete"
                >
                </ion-checkbox> -->
              </button-item-list>
            </ion-col>
          </ion-row>
        </ion-col>
        <!-- <button-item-list
          v-if="addButtonShow"
          @emitAddItems="addItems"
          :propMode="'addActive'"
        ></button-item-list> -->
      </ion-col>
    </ion-row>
  </ion-grid>
  <div v-if="deletePannelShow" class="delete-footer">
    <ion-button
      expand="full"
      class="delte-footer-button"
      color="danger"
      @click="SubmitDeleteItems"
      >삭제하기</ion-button
    >
  </div>
  <teleport to="body">
    <ion-modal
      :is-open="isOpenRef"
      css-class="my-custom-class"
      :swipe-to-close="true"
      @didDismiss="openModal(false)"
    >
      <Modal :title="'냉장고를 부탁해'" @submit="SubmitAddItems"
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
  Ref,
  ref,
} from "vue";
import {
  IonRow,
  IonGrid,
  IonCol,
  IonModal,
  IonButton,
  // IonCheckbox,
} from "@ionic/vue";
import ButtonItemList from "./cardButton.vue";
// import TagUpdatedDate from "./TagUpdatedDate.vue";
import Tab3ModalContent from "./Tab3ModalContent.vue";
import Modal from "./AppModal.vue";
import { FrigeType, IngredientType } from "@/types/frige";
import { useStore } from "@/store/index";
import { VueEvent } from "@/types/event";

export default defineComponent({
  components: {
    IonButton,
    IonGrid,
    IonCol,
    // IonCheckbox,
    IonRow,
    IonModal,
    ButtonItemList,
    // TagUpdatedDate,
    Tab3ModalContent,
    Modal,
  },
  setup() {
    const store = useStore(); //스토어
    const addButtonShow = computed(() => {
      return store.state.ui.addButton;
    });
    const deletePannelShow = computed(() => {
      return store.state.ui.deletePannel;
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

    //버튼에서 emit 을 받온다.
    const isOpenRef = ref(false);
    const openModal = (state: boolean) => (isOpenRef.value = state);
    const addItems = function (val: any) {
      openModal(true);
    };
    //삭제버튼 눌렀을때 삭제내용 선택 할 수 있도록
    //좌측 checkbox 생성 및 다음 버튼 부턴 삭제
    const ItemsBeDeleted: Ref<string[]> = ref([]);
    const deleteItems = function (val: string) {
      const includeId = ItemsBeDeleted.value.includes(val);
      if (!deletePannelShow.value) {
        store.commit("ui/fetchStateDelete");
      }

      if (includeId) {
        ItemsBeDeleted.value.splice(ItemsBeDeleted.value.indexOf(val), 1);
      } else {
        ItemsBeDeleted.value.push(val);
      }

      buttomMode.value = "disable";
    };
    const checkBeCancledId = (val: string): boolean => {
      const includeId = ItemsBeDeleted.value.includes(val);
      return includeId;
    };

    // 모달 데이터 emit 받아오고 업데이트 한다.
    // 확인버튼을 선택했을 때 vuex에서 ItemsBeAdd가 업데이트 된다.
    let itemsBeAdd: any = reactive([]);

    const updatedItemsBeAdd = (items: IngredientType[]) => {
      itemsBeAdd = items;
    };

    const SubmitAddItems = () => {
      openModal(false);
      store.commit("frige/fetchItemsBeAdd", itemsBeAdd);
    };

    const SubmitDeleteItems = (event: VueEvent.Mouse<HTMLElement>) => {
      store.commit("ui/fetchStateAdd");
      store.commit("frige/fetchItemsBeDelete", ItemsBeDeleted.value);
      ItemsBeDeleted.value = [];
    };

    return {
      ArrMock,
      addButtonShow,
      deletePannelShow,
      buttomMode,
      sortedItems,
      isOpenRef,
      openModal,
      addItems,
      deleteItems,
      updatedItemsBeAdd,
      setCardRef,
      checkBeCancledId,
      ItemsBeDeleted,
      SubmitAddItems,
      SubmitDeleteItems,
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
.checkbox-delete {
  --size: 20px;
  align-content: center;
  pointer-events: none;
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