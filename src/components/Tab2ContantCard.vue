<template>
  <ion-card mode="ios">
    <div class="tab2-thumbnail">
      <img src="@/assets/img/youtube_thum.png" />
      <tab-2-tool-chip></tab-2-tool-chip>
    </div>
    <ion-grid class="tab2-card-grid">
      <ion-row>
        <ion-card-title class="tab2-card-title"
          >[백종원의 집밥 레시피]콩나물무침 100인분!!!! 기가막힌 맛
          엄지척</ion-card-title
        >
      </ion-row>
      <ion-row class="tab2-chip-container">
        <ion-chip class="tab2-chip" outline v-for="index in 2" :key="index">
          재료이름
        </ion-chip>
      </ion-row>
    </ion-grid>
  </ion-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonGrid, IonRow, IonCardTitle, IonChip } from "@ionic/vue";
import Tab2ToolChip from "./Tab2ToolChip.vue";

export default defineComponent({
  components: {
    IonCard,
    IonGrid,
    IonChip,
    IonRow,
    IonCardTitle,
    Tab2ToolChip,
  },
});
</script>
<style lang="scss" scoped>
.tab2-card-grid {
  --ion-grid-padding: 10px;
}
.tab2-thumbnail {
  position: relative;
  width: 100%;
}
.tab2-card-title {
  margin-top: 10px;
  font-size: 16px;
}
.tab2-chip-container {
  margin-top: 10px;
}
.tab2-chip {
  margin-left: 0px !important;
  border: 1px solid #9e9e9e;
  color: #616161;
  font-size: 12px;
  font-weight: bold;
}
</style>