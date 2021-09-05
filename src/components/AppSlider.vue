<template>
  <swiper>
    <swiper-slide>
      <tab-2-contant-card></tab-2-contant-card>
    </swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
  </swiper>
</template>
<script lang="ts">
/* tslint:disable:no-unused-variable */
import SwiperCore from "swiper";
import { defineComponent } from "vue";
import { IonicSwiper } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import Tab2ContantCard from "./Tab2ContantCard.vue";
SwiperCore.use([IonicSwiper]);
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    Tab2ContantCard,
  },

  setup() {
    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
});
</script>
<style scoped>
</style>
