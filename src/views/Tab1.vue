<template>
  <ion-page>
    <app-header :headerTitle="'알림'"></app-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content
          :pulling-icon="chevronDownCircleOutline"
          pulling-text="Pull to refresh"
          refreshing-spinner="circles"
          refreshing-text="Refreshing..."
        >
        </ion-refresher-content>
      </ion-refresher>
      <ion-list button>
        <alaram-list-item
          v-for="(item, index) of frizeAlaram"
          :key="index"
          :propItemData="item"
        >
        </alaram-list-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import AppHeader from "@/components/AppHeader.vue";

import {
  IonPage,
  IonContent,
  IonList,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { fishOutline, chevronDownCircleOutline } from "ionicons/icons";
import { useStore } from "@/store/index";
import AlaramListItem from "@/components/AlaramListItem.vue";
export default defineComponent({
  setup() {
    const store = useStore();

    //냉장고 알람 아이템 배열
    const frizeAlaram = ref();

    //냉장고 알람 아이템 GET
    const getFrizeAlaramItems = async () => {
      store
        .dispatch("frige/AllFrizeGet", {
          email: localStorage.getItem("email"),
        })
        .then(() => {
          store
            .dispatch("frige/alaramFrizeIngredientGet", {
              frizesId: store.getters["frige/getAllCateId"],
            })
            .then((data) => {
              frizeAlaram.value = store.state.frige.frizeAlaram;
            });
        });
    };

    getFrizeAlaramItems();
    const doRefresh = (event: any) => {
      console.log("Begin async operation");
      getFrizeAlaramItems().then(() => {
        setTimeout(() => {
          event.target.complete();
        }, 1000);
      });
    };

    return { fishOutline, frizeAlaram, doRefresh, chevronDownCircleOutline };
  },
  components: {
    AppHeader,
    IonPage,
    IonContent,
    IonList,
    AlaramListItem,
    IonRefresher,
    IonRefresherContent,
  },
});
</script>
<style lang="scss" scoped>
</style>
