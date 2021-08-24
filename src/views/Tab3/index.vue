<template>
  <ion-page>
    <app-header :headerTitle="'MY 냉장고'"></app-header>
    <ion-content class="a">
      <ion-router-outlet></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import { IonPage, IonRouterOutlet, IonContent } from "@ionic/vue";

export default {
  components: {
    AppHeader,
    IonPage,
    IonRouterOutlet,
    IonContent,
  },
};
</script>
