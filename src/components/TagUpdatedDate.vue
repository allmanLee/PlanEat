<template>
  <ion-chip class="chip-date">
    <ion-label>{{ number }}</ion-label>
  </ion-chip>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonLabel, IonChip } from "@ionic/vue";
export default defineComponent({
  date() {
    return {};
  },
  components: {
    IonLabel,
    IonChip,
  },
  props: {
    number: {
      type: Number,
      default: 0,
    },
  },
});
</script>
<style lang="scss" scoped>
.chip-date {
  --background: #2e2e2e;
  --color: white;
}
</style>
