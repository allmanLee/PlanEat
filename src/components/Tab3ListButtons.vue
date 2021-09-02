<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center">
      <ion-col>
        <ion-col
          size="auto"
          v-for="(item, index) in fetchIngredients || []"
          :key="index"
        >
          <ion-row class="ion-justify-content-center">
            <ion-col size="auto">
              <tag-updated-date
                :propDate="item[0].updatedDate"
              ></tag-updated-date>
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-center">
            <ion-col size="12">
              <button-item-list
                v-for="(ingredient, index) in item || []"
                :key="index"
                :propIngredient="ingredient.name"
                :propAmount="ingredient.amount"
                :ref="setCardRef"
                :propMode="buttomMode"
                @emitDeleteItems="deleteItems"
              >
                <ion-checkbox class="checkbox-delete"> </ion-checkbox
              ></button-item-list>
            </ion-col>
          </ion-row>
        </ion-col>
        <button-item-list
          @emitAddItems="addItems"
          :propMode="'addActive'"
        ></button-item-list>
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
      <Modal :title="'냉장고를 부탁해'" @submit="submitAddItem"
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
  defineComponent,
  onBeforeUpdate,
  onMounted,
  reactive,
  ref,
} from "vue";
import { IonRow, IonGrid, IonCol, IonModal, modalController } from "@ionic/vue";
import ButtonItemList from "./ButtonItemList.vue";
import TagUpdatedDate from "./TagUpdatedDate.vue";
import Tab3ModalContent from "./Tab3ModalContent.vue";
import Modal from "./AppModal.vue";
import { FrigeType, IngredientType } from "@/types/frige";
import { useStore } from "@/store/index";

export default defineComponent({
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonModal,
    ButtonItemList,
    TagUpdatedDate,
    Tab3ModalContent,
    Modal,
  },
  setup() {
    const store = useStore();
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

    const ArrMock = computed(() => {
      return store.state.frige.items;
    });

    const fetchIngredients = computed(() => {
      const TestReduce = ArrMock.value.reduce((acc: any, item: any): any => {
        return {
          ...acc,
          [item.updatedDate]: (acc[item.updatedDate] || []).concat(item),
        };
      }, {});
      return TestReduce;
    });

    //버튼에서 emit 을 받온다.
    const isOpenRef = ref(false);
    const openModal = (state: boolean) => (isOpenRef.value = state);
    const addItems = function (val: any) {
      console.log(val);
      openModal(true);
    };
    console.log(ArrMock.value);
    //삭제버튼 눌렀을때 삭제내용 선택 할 수 있도록
    //좌측 checkbox 생성
    const ItemsBeDeleted = [];

    const deleteItems = function (val: any) {
      console.log("h생성");
      buttomMode.value = "disable";

      // Array.from(cardRefs).forEach((el) => {
      //   el.appendChild(ButtonItemList);
      // });
    };

    // 모달 데이터 emit 받아오고 업데이트 한다.
    // 확인버튼을 선택했을 때 vuex에서 ItemsBeAdd가 업데이트 된다.
    let itemsBeAdd: any = reactive([]);

    const updatedItemsBeAdd = (items: IngredientType[]) => {
      itemsBeAdd = items;
    };

    const submitAddItem = () => {
      openModal(false);
      store.commit("frige/fetchItemsBeAdd", itemsBeAdd);
    };

    return {
      ArrMock,
      buttomMode,
      fetchIngredients,
      isOpenRef,
      openModal,
      addItems,
      deleteItems,
      submitAddItem,
      updatedItemsBeAdd,
      setCardRef,
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
}
</style>