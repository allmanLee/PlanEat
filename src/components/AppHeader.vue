<template>
  <ion-header>
    <ion-toolbar>
      <ion-title class="app-header-title">{{ headerTitle }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/vue";
import { arrowBack } from "ionicons/icons";
export default defineComponent({
  props: {
    headerTitle: String,
  },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
  },
  setup() {
    return { arrowBack };
  },
});
</script>
<style lang="scss" scoped>
.app-header-title {
  font-weight: bold;
}
</style>
