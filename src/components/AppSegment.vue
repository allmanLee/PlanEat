<template>
  <ion-toolbar>
    <ion-segment
      :value="segementValue"
      @ionChange="ChangeSegment($event)"
      class="tab2-segement"
    >
      <ion-segment-button value="Today"
        ><ion-label class="tab2-segement-label"
          >오늘 레시피</ion-label
        ></ion-segment-button
      >
      <ion-segment-button value="Total"
        ><ion-label class="tab2-segement-label"
          >전체보기</ion-label
        ></ion-segment-button
      >
      <ion-segment-button value="MyPick"
        ><ion-label class="tab2-segement-label"
          >MY PICK</ion-label
        ></ion-segment-button
      >
    </ion-segment>
  </ion-toolbar>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonToolbar, IonLabel, IonSegment, IonSegmentButton } from "@ionic/vue";
import { VueEvent } from "@/types/event";

export default defineComponent({
  components: { IonToolbar, IonLabel, IonSegment, IonSegmentButton },
  emits: ["emitSegmentValue"],
  setup(props, { emit }) {
    const segementValue = ref("Today");

    const ChangeSegment = (event: any) => {
      segementValue.value = event.detail.value;
      emit("emitSegmentValue", segementValue);
    };
    return {
      segementValue,
      ChangeSegment,
    };
  },
});
</script>
<style scoped>
.tab2-segement {
  font-weight: bold !important;
}
.tab2-segement-label {
  font-weight: bold !important;
}
ion-segment-button {
  --color-checked: black;
  --indicator-color: #ffc500;
  --ripple-color: transparent !important;
}
</style>
