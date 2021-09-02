<template>
  <ion-header v-if="header">
    <ion-toolbar>
      <ion-title class="app-header-title">{{ headerTitle }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/vue";
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
.app-header-title {
  font-weight: bold;
}
</style>
