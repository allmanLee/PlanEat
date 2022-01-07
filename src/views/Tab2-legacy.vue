<template>
  <ion-page>
    <app-header :headerTitle="'레시피'"></app-header>
    <ion-header>
      <tab-2-segment
        :propSegmentValue="segmentValue"
        @emitSegmentValue="fetchSegmentValue"
      ></tab-2-segment>
    </ion-header>
    <ion-content class="b">
      <app-slider
        :propSegmentValue="segmentValue"
        @emitSlideValue="fetchSlideValue"
      ></app-slider>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonContent, IonHeader } from "@ionic/vue";
import AppHeader from "@/components/AppHeader.vue";
import Tab2Segment from "@/components/Tab2Segment.vue";
import AppSlider from "@/components/AppSlider.vue";

export default defineComponent({
  components: {
    AppHeader,
    Tab2Segment,
    IonPage,
    IonContent,
    IonHeader,
    AppSlider,
  },
  setup() {
    const segmentValue = ref(0);
    const fetchSegmentValue = (val: number) => {
      segmentValue.value = val;
      console.log("segment: ", val);
    };
    const fetchSlideValue = (val: number) => {
      console.log("emit: ", val);
      segmentValue.value = val;
    };

    return { segmentValue, fetchSegmentValue, fetchSlideValue };
  },
});
</script>


<style scoped>
</style>