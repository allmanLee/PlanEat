<template>
  <ion-header mode="md" v-if="header" class="ion-no-border">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title class="app-header-title">{{ headerTitle }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  IonButtons,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
import { arrowBack } from "ionicons/icons";
import { useStore } from "@/store/index";
export default defineComponent({
  props: {
    headerTitle: String,
  },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
  },
  setup() {
    const store = useStore();
    const header = computed(() => {
      return store.state.ui.header;
    });
    return { arrowBack, header };
  },
});
</script>
<style lang="scss" scoped>
</style>
