<template>
  <ion-page>
    <ion-content scrollY="false">
      <ion-router-outlet></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonRouterOutlet, IonContent } from "@ionic/vue";

export default {
  components: {
    IonPage,
    IonRouterOutlet,
    IonContent,
  },
};
</script>
