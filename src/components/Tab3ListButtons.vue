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
                <ion-item mode="ios" class="button-item-contaier" lines="none">
                  <button-item-list
                    :propFrizeId="frizeId"
                    :propIngredient="ingredient"
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
                    fill="clear"
                    type="button"
                    color="medium"
                    @click="SubmitDeleteItem(ingredient.id)"
                  >
                    삭제
                  </ion-button>
                </ion-item-options>
              </ion-item-sliding>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-col>
    </ion-row>
  </ion-grid>
  <teleport to="body"> </teleport>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent } from "vue";
import {
  IonRow,
  IonGrid,
  IonCol,
  IonButton,
  IonItem,
  IonItemOptions,
  IonItemSliding,
} from "@ionic/vue";
import ButtonItemList from "./cardButton.vue";
import { FrigeType } from "@/types/frige";
import { useStore } from "@/store/index";

export default defineComponent({
  components: {
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
    ButtonItemList,
    IonItem,
    IonItemOptions,
    IonItemSliding,
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
    const store = useStore();

    const frizeId: ComputedRef<string> = computed(() => {
      return store.state.frige.selectedCateId;
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

    const SubmitDeleteItem = (itemId: string) => {
      store.dispatch("frige/frizeIngredient", {
        frizeId: selectedCateId.value,
        ingredientAdd: [],
        ingredientDelete: [itemId],
      });
    };

    return {
      ArrMock,
      sortedItems,
      frizeId,
      SubmitDeleteItem,
    };
  },
});
</script>
<style lang="scss" scoped>
li {
  list-style-type: none;
}
ion-item {
  height: 100%;
  --inner-padding-start: 0px;
  --padding-start: 0px;
  --inner-padding-end: 0px;
  --padding-end: 0px;
}
ion-item-options {
  border: none;
  width: 20%;
  ion-button {
    width: 20%;
    margin: {
      top: auto;
      bottom: auto;
      left: 16px;
    }
    ion-icon {
      font-size: rem-calc(40px);
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