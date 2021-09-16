<template>
  <div class="tab2-video-container">
    <img ref="youtubeThumImg" src="@/assets/img/youtube_thum.png" />
    <youtube-iframe
      v-if="VideoShow"
      class="a"
      ref="videoIframe"
      :video-id="YT_VIDEO_ID"
      :player-width="'100%'"
      :player-height="VIDEO_HEIGHT"
      :no-cookie="TRUE / FALSE"
      :player-parameters="YT_PLAYER_PARAMS"
      @EVENT="CALLBACK"
    ></youtube-iframe>
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
  <div class="footer-buttons">
    <ion-row>
      <ion-col>
        <ion-button
          color="light"
          class="button-back"
          expand="full"
          @click="ClickBackButton"
          >뒤로가기</ion-button
        >
      </ion-col>
      <ion-col>
        <ion-button expand="full">+ 마이 레시피북</ion-button>
      </ion-col>
    </ion-row>
  </div>
</template>
<script lang="ts">
import { VueEvent } from "@/types/event";
import {
  defineComponent,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  Ref,
  ref,
} from "vue";

export default defineComponent({
  emits: ["emitCloseModal"],
  setup(props, { emit }) {
    const VIDEO_HEIGHT = ref(0);
    let youtubeThumImg: Ref<HTMLImageElement> = ref() as Ref<HTMLImageElement>;
    const VideoShow = ref(false);

    onUpdated(() => {
      youtubeThumImg = ref() as Ref<HTMLImageElement>;
    });
    onMounted(() => {
      setTimeout(() => {
        VIDEO_HEIGHT.value = youtubeThumImg.value.clientHeight;
        console.log(youtubeThumImg.value.clientHeight);
        VideoShow.value = true;
      }, 200);
    });

    const ClickBackButton = (event: VueEvent.Mouse<HTMLElement>) => {
      emit("emitCloseModal");
    };

    return {
      youtubeThumImg,
      VIDEO_HEIGHT,
      VideoShow,
      ClickBackButton,
    };
  },
});
</script>
<style lang="scss" scoped>
.tab2-video-container {
  position: relative;
}
.a {
  position: absolute !important;
  width: 100%;
  left: 0;
  top: 0;
}
.tab2-card-grid {
  --ion-grid-padding: none;
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
.footer-buttons {
  position: fixed;
  width: 100%;
  height: 46px;
  bottom: 0px;
  left: 0px;
  box-shadow: 0px -2px 12px 4px rgba(0, 0, 0, 0.2);
  z-index: 3;

  --ion-grid-column-padding: none;
  --ion-grid-padding: none;
  --ion-grid-row-padding: none;

  ion-button {
    margin: 0px;
    height: 46px;
    font-weight: bold;
  }
}
</style>

