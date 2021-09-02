<template>
  <ion-card
    id="buttonCard"
    :class="buttonMode === 'addActive' ? 'list-button-active' : 'list-buton'"
    Expand="block"
    :color="buttonMode === 'addActive' ? 'primary' : ''"
    @click="ClickButton"
  >
    <ion-card-header>
      <ion-card-title class="card-title">
        <ion-grid class="buttonCard-grid">
          <ion-row
            ><ion-col class="ion-align-self-center checkbox-col" size="auto"
              ><slot></slot
            ></ion-col>
            <ion-col class="ion-align-self-center" size="auto">{{
              ingredient.name
            }}</ion-col>
            <ion-col class="text-item-amount ion-align-self-center"
              >{{ ingredient.amount }} / D + 1</ion-col
            >
          </ion-row>
        </ion-grid>
      </ion-card-title>
    </ion-card-header>
  </ion-card>
  <app-popover
    :propOpenPopover="closePopover"
    @closePopover="closePopover = false"
  >
    <ion-list>
      <ion-item button lines="none" class="pop-item">재료 설정</ion-item>
      <ion-item button lines="none" class="pop-item" @click="DeleteItems">
        삭제
      </ion-item>
    </ion-list>
  </app-popover>
</template>
<script lang="ts">
import { computed, defineComponent, ref, PropType } from "vue";
import {
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
} from "@ionic/vue";
import AppPopover from "./AppPopover.vue";
import { VueEvent } from "@/types/event";
import { FrigeType } from "@/types/frige";

export default defineComponent({
  components: {
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    AppPopover,
  },
  props: {
    propIngredient: {
      type: Object as PropType<FrigeType>,
      default: () => {
        return {
          id: "0",
          name: "+ 추가",
          engName: "add",
          updatedDate: new Date(),
          amount: "보통",
        };
      },
    },
    propMode: {
      type: String,
      default: "nomal",
    },
  },
  emits: ["emitAddItems", "emitDeleteItems"],
  setup(props, { emit }) {
    const buttonMode = computed(() => props.propMode);
    const ingredient = computed(() => props.propIngredient);
    const closePopover = ref(false);
    const AddItems = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      emit("emitAddItems", "why");
    };
    const DeleteItems = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      closePopover.value = false;
      emit("emitDeleteItems", ingredient.value.id);
    };
    const ClickButton = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      if (buttonMode.value == "nomal") {
        closePopover.value = true;
      } else if (buttonMode.value === "addActive") {
        AddItems(event);
      } else emit("emitDeleteItems", ingredient.value.id);
    };

    return {
      ingredient,
      buttonMode,
      closePopover,
      AddItems,
      DeleteItems,
      ClickButton,
    };
  },
});
</script>
<style lang="scss" scoped>
#buttonCard {
  margin-left: 0;
  margin-right: 0;
}
.list-button-active {
  --border-width: 2px;
  color: #3d2f01;
}
.list-buton {
  --border-width: 1px;
  --background: white;
}
.checkbox-col {
  height: 20px;
  padding: 0px 5px 0px 0px;
}
.card-title {
  font-size: 16px;
  padding: 0px;
}
.text-item-amount {
  text-align: end;
  color: #d5a506;
  opacity: 0.6;
}
.tab3-popup-button {
  margin-top: 12px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
}
.pop-item {
  font-size: 14px;
  font-weight: 400;
}
#buttonItemList {
  position: relative;
}
</style>
