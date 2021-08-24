<template>
  <ion-page>
    <app-header :headerTitle="'레시피'"></app-header>
  </ion-page>
</template>

<script lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import { IonPage } from "@ionic/vue";

export default {
  components: {
    AppHeader,
    IonPage,
  },
};
</script>
