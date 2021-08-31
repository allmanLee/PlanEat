<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center">
      <ion-col>
        <ion-col
          size="auto"
          v-for="(item, index) in fetchIngredients"
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
                v-for="(ingredient, index) in item"
                :key="index"
                :propIngredient="ingredient.name"
                :propAmount="ingredient.amount"
              ></button-item-list>
            </ion-col>
          </ion-row>
        </ion-col>
        <button-item-list
          @callAddButton="emitAddItem"
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
import { computed, defineComponent, reactive, ref } from "vue";
import { IonRow, IonGrid, IonCol, IonModal, modalController } from "@ionic/vue";
import ButtonItemList from "./ButtonItemList.vue";
import TagUpdatedDate from "./TagUpdatedDate.vue";
import Tab3ModalContent from "./Tab3ModalContent.vue";
import Modal from "./AppModal.vue";
import { FrigeType } from "@/types/frige";
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
    const isOpenRef = ref(false);
    const openModal = (state: boolean) => (isOpenRef.value = state);

    const emitAddItem = function (val: any) {
      console.log(val);
      openModal(true);
    };

    // 모달 데이터 emit 받아오고 업데이트 한다.
    // 확인버튼을 선택했을 때 vuex에서 ItemsBeAdd가 업데이트 된다.
    let itemsBeAdd: any = reactive([]);

    const updatedItemsBeAdd = (items: FrigeType[]) => {
      itemsBeAdd = items;
      console.log("emit :", items);
    };

    const submitAddItem = () => {
      openModal(false);
      console.log(`보내는 데이터: ${itemsBeAdd}`);
      store.commit("frige/fetchItemsBeAdd", itemsBeAdd);
    };

    return {
      ArrMock,
      fetchIngredients,
      isOpenRef,
      openModal,
      emitAddItem,
      submitAddItem,
      updatedItemsBeAdd,
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
</style>