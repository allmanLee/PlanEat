<template>
  <ion-header>
    <ion-toolbar
      ><ion-back-button></ion-back-button>
      <ion-title class="app-header-title">{{ headerTitle }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonHeader, IonToolbar, IonBackButton, IonTitle } from "@ionic/vue";

export default defineComponent({
  props: {
    headerTitle: String,
  },
  components: {
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
  },
});
</script>
<style lang="scss" scoped>
.app-header-title {
  font-weight: bold;
}
</style>
