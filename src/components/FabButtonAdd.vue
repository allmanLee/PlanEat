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
        <Modal :title="frizeName"
          ><tab-3-add-modal-content
            @emitAddItem="openModal(false)"
          ></tab-3-add-modal-content
        ></Modal>
      </ion-modal>
    </teleport>
  </div>
</template>
<script lang="ts">
import { add } from "ionicons/icons";
import { useStore } from "@/store/index";
import { IonFab, IonIcon, IonFabButton, IonModal } from "@ionic/vue";
import { computed, ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import Modal from "./AppModal.vue";
import Tab3AddModalContent from "@/components/Tab3AddModalContent.vue";
import { FrigeType, IngredientType } from "@/types/frige";
export default defineComponent({
  setup() {
    const store = useStore();
    const frizeId = computed(() => store.state.frige.selectedCateId);
    const frizeName = computed(() =>
      store.getters["frige/getCateName"](frizeId.value)
    );
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
            id: `${dateForId}${el.name}`,
            name: el.name,
            expirationDate: `${expirationDate.getFullYear()}-${expirationDate.getMonth()}-${expirationDate.getDate()}`,
            updatedDate: updatedDate,
          } as FrigeType;
        }
      });
    };

    // const SubmitAddItems = (itemId: string) => {
    //   isOpenRef.value = false;
    //   store.dispatch("frige/frizeIngredient", {
    //     frizeId: prop.propFrizeId,
    //     ingredientAdd: addItems.value,
    //   });
    // };
    return { frizeName, add, isOpenRef, openModal, updatedItemsBeAdd };
  },
  components: {
    Tab3AddModalContent,
    IonFab,
    IonIcon,
    IonFabButton,
    IonModal,
    Modal,
  },
});
</script>