<template>
  <ion-page>
    <app-header :headerTitle="'레시피'"></app-header>
    <ion-content class="b">
      <ion-header>
        <app-segment :emitSegmentValue="fetchSegmentValue"></app-segment>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import AppSegment from "@/components/AppSegment.vue";
import { IonPage } from "@ionic/vue";

export default defineComponent({
  components: {
    AppHeader,
    AppSegment,
    IonPage,
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