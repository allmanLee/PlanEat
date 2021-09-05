<template>
  <ion-page>
    <app-header :headerTitle="'레시피'"></app-header>
    <ion-header>
      <app-segment :emitSegmentValue="fetchSegmentValue"></app-segment>
    </ion-header>
    <ion-content class="b">
      <app-slider></app-slider>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent, IonHeader } from "@ionic/vue";
import AppHeader from "@/components/AppHeader.vue";
import AppSegment from "@/components/AppSegment.vue";
import AppSlider from "@/components/AppSlider.vue";

export default defineComponent({
  components: {
    AppHeader,
    AppSegment,
    IonPage,
    IonContent,
    IonHeader,
    AppSlider,
  },
  setup() {
    let segmentIndex = 0;
    const fetchSegmentValue = (val: any) => {
      segmentIndex = val;
    };
    return { segmentIndex, fetchSegmentValue };
  },
});
</script>


<style scoped>
</style>