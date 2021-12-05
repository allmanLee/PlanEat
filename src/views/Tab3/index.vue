<template>
  <ion-page>
    <app-header :headerTitle="'냉장고'"></app-header>
    <ion-content scrollY="false">
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
