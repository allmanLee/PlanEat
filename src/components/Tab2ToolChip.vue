<template>
  <ion-chip class="video-tool-chip">
    <ion-label color="primary" class="possible-value-label">지금 가능</ion-label
    ><ion-label class="time-label">00:00</ion-label></ion-chip
  >
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonChip, IonLabel } from "@ionic/vue";

export default defineComponent({
  components: {
    IonChip,
    IonLabel,
  },
});
</script>
<style lang="scss" scoped>
.video-tool-chip {
  position: absolute;
  z-index: 100;
  bottom: 10px;
  right: 6px;
  background-color: rgba(0, 0, 0, 0.86);
  color: white;
  font-weight: bold;
  font-size: 14px;
}
.possible-value-label {
  margin-right: 10px;
}
.time-label {
}
</style>
