<template>
  <ion-page></ion-page>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { IonPage } from "@ionic/vue";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    IonPage,
  },
  setup() {
    const store = useStore();

    return {};
  },
});
</script>
