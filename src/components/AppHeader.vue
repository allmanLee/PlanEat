<template>
  <ion-header mode="md" class="ion-no-border">
    <ion-toolbar mode="md">
      <!-- <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons> -->
      <ion-title mode="md" class="app-header-title">{{
        headerTitle
      }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  // IonButtons,
  // IonBackButton,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
export default defineComponent({
  props: {
    headerTitle: String,
  },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    // IonButtons,
    // IonBackButton,
  },
});
</script>
<style lang="scss" scoped>
</style>
