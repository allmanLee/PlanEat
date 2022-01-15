<template>
  <div>
    <ion-fab mode="ios" vertical="bottom" horizontal="end" slot="fixed">
      <ion-label>재료추가</ion-label>
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
import { IonFab, IonIcon, IonLabel, IonFabButton, IonModal } from "@ionic/vue";
import { computed, ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import Modal from "./AppModalContainer.vue";
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
    IonLabel,
    IonIcon,
    IonFabButton,
    IonModal,
    Modal,
  },
});
</script>
<style lang="scss" scoped>
ion-fab {
  text-align: center;
  ion-label {
    font-weight: 600;
    font-size: rem-calc(14px);
    color: var(--ion-color-primary);
  }
  ion-fab-button {
    animation: sticky_bounce 0.5s 3 ease-out 3s;
  }
}

/* animation */
@keyframes sticky_bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  25%,
  80% {
    transform: translateY(2px);
  }
  50% {
    transform: translateY(10px);
  }
}

@keyframes sticky_expand_second {
  0% {
    transform: translateX(72px);
  }
  70% {
    transform: translateX(-20px);
  }
  90% {
    transform: translateX(-10px);
  }
  95% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes sticky_expand_third {
  0% {
    transform: translateX(144px);
  }
  70% {
    transform: translateX(-25px);
  }
  90% {
    transform: translateX(-10px);
  }
  95% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
}
/* WMG-25789 */
@keyframes sticky_expand_fourth {
  0% {
    transform: translateX(216px);
  }
  70% {
    transform: translateX(-30px);
  }
  90% {
    transform: translateX(-10px);
  }
  95% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
}
/* // WMG-25789 */
</style>