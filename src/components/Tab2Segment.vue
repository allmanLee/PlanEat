<template>
  <ion-toolbar class="tab2-segement-toolbar" mode="md">
    <ion-segment
      :value="segementValue"
      @ionChange="ChangeSegment($event)"
      class="tab2-segement"
    >
      <ion-segment-button value="0"
        ><ion-label class="tab2-segement-label"
          >오늘 레시피</ion-label
        ></ion-segment-button
      >
      <ion-segment-button value="1"
        ><ion-label class="tab2-segement-label"
          >전체보기</ion-label
        ></ion-segment-button
      >
      <ion-segment-button value="2"
        ><ion-label class="tab2-segement-label"
          >마이 레시피</ion-label
        ></ion-segment-button
      >
    </ion-segment>
  </ion-toolbar>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { IonToolbar, IonLabel, IonSegment, IonSegmentButton } from "@ionic/vue";
import { VueEvent } from "@/types/event";

export default defineComponent({
  components: { IonToolbar, IonLabel, IonSegment, IonSegmentButton },
  props: {
    propSegmentValue: {
      type: Number,
      default: 0,
    },
  },
  emits: ["emitSegmentValue"],
  setup(props, { emit }) {
    const segementValue = ref(0);
    //prop으로 받아온 segment 값이 변경되었을 때
    watch(
      () => props.propSegmentValue,
      (newValue, oldValue) => {
        console.log("props.visible 의 변이가 감지되었을 때 ", {
          newValue,
          oldValue,
        });
        segementValue.value = newValue;
      }
    );

    const ChangeSegment = (event: any) => {
      segementValue.value = event.detail.value;

      console.log("segment: ", segementValue.value);
      emit("emitSegmentValue", segementValue.value);
    };
    return {
      segementValue,
      ChangeSegment,
    };
  },
});
</script>
<style scoped>
.tab2-segement-toolbar {
  --background: white;
}
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
