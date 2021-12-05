<template>
  <ion-card
    ios="add"
    mode="ios"
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
            <ion-col class="badge-container" size="auto"
              ><ion-badge color="primary">경고</ion-badge></ion-col
            >
            <ion-col class="text-date ion-align-self-center">
              {{ ingredient.updatedDate }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-title>
    </ion-card-header>
    <ion-card-content> 메모가 필요하신가요? </ion-card-content>
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
  IonCardContent,
  IonBadge,
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
    IonCardContent,
    IonBadge,
    AppPopover,
  },
  props: {
    propIngredient: {
      type: Object as PropType<FrigeType>,
      default: () => {
        return {
          id: "asdf324i180",
          name: "재료이름",
          engName: "ingredient name",
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
    const formatDate = (date: Date) =>
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

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
      formatDate,
    };
  },
});
</script>
<style lang="scss" scoped>
#buttonCard {
  margin-left: 0;
  margin-right: 0;
}
.list-buton {
  margin-left: 0;
  margin-right: 0;
  padding: 14px;
  --border-width: 1px;
  --background: white;
}
ion-card-header {
  padding: 0px;
}
ion-card-content {
  margin-top: 4px;
  padding: 0px;
}
.badge-container {
  height: 100%;
  line-height: 100%;
  vertical-align: middle;
  padding-left: 8px;
}
.checkbox-col {
  height: 20px;
  padding: 0px 0px 0px 0px;
}
.card-title {
  font-size: 16px;
  padding: 0px;
}
.text-date {
  text-align: end;
  font-size: rem-calc(12px);
  color: var(--custom-gray-02);
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
