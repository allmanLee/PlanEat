<template>
  <ion-page>
    <ion-content>
      <tab-3-list-buttons></tab-3-list-buttons>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import Tab3ListButtons from "@/components/Tab3ListButtons.vue";
export default defineComponent({
  components: {
    IonPage,
    IonContent,
    Tab3ListButtons,
  },
});
</script>

<style lang="scss" scoped>
.content {
  margin-left: 16px;
  margin-right: 16px;
}
</style>