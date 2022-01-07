<template>
  <ion-page>
    <app-header :headerTitle="'MY/설정'"></app-header>
    <ion-content>
      <setting-card-list></setting-card-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import AppHeader from "@/components/AppHeader.vue";
import SettingCardList from "@/components/Tab2CardList.vue";

export default defineComponent({
  components: {
    AppHeader,
    IonPage,
    IonContent,
    SettingCardList,
  },
  setup() {
    return {};
  },
});
</script>


<style scoped>
ion-content {
  --background: var(--custom-gray-05);
  --padding-start: 0px;
  --padding-end: 0px;
}
</style>