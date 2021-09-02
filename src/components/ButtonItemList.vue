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
              itemName
            }}</ion-col>
            <ion-col class="text-item-amount ion-align-self-center"
              >{{ itemAmount }} / D + 1</ion-col
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
import { computed, defineComponent, ref } from "vue";
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
      type: String,
      default: "추가하기",
    },
    propMode: {
      type: String,
      default: "nomal",
    },
    propAmount: {
      type: String,
      default: "보통",
    },
  },
  emits: ["emitAddItems", "emitDeleteItems"],
  setup(props, { emit }) {
    const buttonMode = computed(() => props.propMode);
    const itemName = computed(() => props.propIngredient);
    const itemAmount = computed(() => props.propAmount);
    const closePopover = ref(false);
    const AddItems = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      console.log("ShowSearchItems");
      emit("emitAddItems", "why");
    };
    const DeleteItems = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      closePopover.value = false;
      console.log(itemName.value);
      emit("emitDeleteItems", itemName.value);
    };
    const ClickButton = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      console.log(buttonMode.value);
      if (buttonMode.value == "nomal") {
        console.log("nomal");
        closePopover.value = true;
      } else if (buttonMode.value === "addActive") {
        AddItems(event);
      } else emit("emitDeleteItems", itemName.value);
    };

    return {
      itemName,
      buttonMode,
      closePopover,
      itemAmount,
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
