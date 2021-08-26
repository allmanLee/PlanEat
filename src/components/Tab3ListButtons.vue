<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center">
      <ion-col
        class="ion-justify-content-center"
        size="auto"
        v-for="(item, index) in fetchIngredients"
        :key="index"
      >
        <ion-row>
          <ion-col size="auto">
            <tag-updated-date :number="item[0].updatedDate"></tag-updated-date>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <button-item-list
              v-for="(ingredient, index) in item"
              :key="index"
              :propIngredient="ingredient.name"
            ></button-item-list
          ></ion-col>
        </ion-row>
      </ion-col>
      <button-item-list :propMode="'addActive'"></button-item-list>
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
// import { IonRow, IonGrid, IonCol } from "@ionic/vue";
import ButtonItemList from "./ButtonItemList.vue";
import TagUpdatedDate from "./TagUpdatedDate.vue";

export interface ArrMock {
  name: string;
  updatedDate: number;
}

export default defineComponent({
  components: { ButtonItemList, TagUpdatedDate },
  setup() {
    const ArrMock: ArrMock[] = [
      { name: "사과", updatedDate: 1 },
      { name: "감", updatedDate: 2 },
      { name: "배추", updatedDate: 2 },
      { name: "딸기", updatedDate: 3 },
      { name: "김치", updatedDate: 2 },
    ];

    const fetchIngredients = computed(() => {
      const TestReduce = ArrMock.reduce((acc: any, item): any => {
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