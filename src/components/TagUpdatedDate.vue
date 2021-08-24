<template>
  <ion-chip>
    <ion-label>{{ dateUpdated }}</ion-label>
  </ion-chip>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonLabel, IonChip } from "@ionic/vue";
export default defineComponent({
  date() {
    return {};
  },
  props: {
    dateUpdated: { type: Date, default: "2021-00-00" },
  },
  components: {
    IonLabel,
    IonChip,
  },
});
</script>
