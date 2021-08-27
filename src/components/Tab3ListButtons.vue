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
        <button-item-list :propMode="'addActive'"></button-item-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { IonRow, IonGrid, IonCol } from "@ionic/vue";
import ButtonItemList from "./ButtonItemList.vue";
import TagUpdatedDate from "./TagUpdatedDate.vue";

export interface ArrMock {
  name: string;
  updatedDate: Date;
  amount: "충분" | "보통" | "소량";
}

export default defineComponent({
  components: { IonGrid, IonCol, IonRow, ButtonItemList, TagUpdatedDate },
  setup() {
    const ArrMock: ArrMock[] = [
      { name: "사과", updatedDate: new Date(), amount: "충분" },
      { name: "감", updatedDate: new Date(-1), amount: "충분" },
      { name: "배추", updatedDate: new Date(-2), amount: "충분" },
      { name: "딸기", updatedDate: new Date(5), amount: "충분" },
      { name: "김치", updatedDate: new Date(-4), amount: "충분" },
    ];

    const fetchIngredients = computed(() => {
      const TestReduce = ArrMock.reduce((acc: any, item: any): any => {
        return {
          ...acc,
          [item.updatedDate]: (acc[item.updatedDate] || []).concat(item),
        };
      }, {});
      return TestReduce;
    });

    return { ArrMock, fetchIngredients };
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