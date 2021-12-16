<template>
  <div>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="openModal(true)">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <teleport to="body">
      <ion-modal
        :is-open="isOpenRef"
        css-class="my-custom-class"
        :swipe-to-close="true"
        @didDismiss="openModal(false)"
      >
        <Modal :title="'재료 추가하기'"
          ><tab-3-modal-content
            @emitUpdatedItemsBeAdd="updatedItemsBeAdd"
            @emitSubmit="SubmitAddItems"
          ></tab-3-modal-content
        ></Modal>
      </ion-modal>
    </teleport>
  </div>
</template>
<script lang="ts">
import { add } from "ionicons/icons";
import { useStore } from "@/store/index";
import { IonFab, IonIcon, IonFabButton, IonModal } from "@ionic/vue";
import { ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import Modal from "./AppModal.vue";
import Tab3ModalContent from "@/components/Tab3ModalContent.vue";
import { FrigeType, IngredientType } from "@/types/frige";
export default defineComponent({
  props: {
    propFrizeId: {
      type: String,
      default: () => {
        return "d22f323f";
      },
    },
  },
  setup(prop) {
    const store = useStore();
    //버튼에서 emit 을 받온다.
    const isOpenRef = ref(false);
    const openModal = (state: boolean) => (isOpenRef.value = state);
    const addItems = ref();
    const updatedItemsBeAdd = (val: IngredientType[]) => {
      const today = new Date();
      const toYear = today.getFullYear();
      const toMount = today.getMonth();
      const toDate = today.getDate();
      const updatedDate = `${toYear}-${toMount}-${toDate}`;
      const dateForId = `${toYear}${toMount}${toDate}`;

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      addItems.value = val.map((el) => {
        if (el !== undefined) {
          return {
            id: `${dateForId}${el.engName}`,
            name: el.name,
            engName: el.engName,
            expirationDate: `${expirationDate.getFullYear()}-${expirationDate.getMonth()}-${expirationDate.getDate()}`,
            updatedDate: updatedDate,
          } as FrigeType;
        }
      });
    };

    const SubmitAddItems = (itemId: string) => {
      isOpenRef.value = false;
      store.dispatch("frige/frizeIngredient", {
        frizeId: prop.propFrizeId,
        ingredientAdd: addItems.value,
      });
    };
    return { add, isOpenRef, openModal, SubmitAddItems, updatedItemsBeAdd };
  },
  components: {
    Tab3ModalContent,
    IonFab,
    IonIcon,
    IonFabButton,
    IonModal,
    Modal,
  },
});
</script>