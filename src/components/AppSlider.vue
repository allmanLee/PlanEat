<template>
<<<<<<< Updated upstream
  <swiper ref="swiper" :slides-per-view="1" @slideChange="onSlideChange">
    <swiper-slide value="Today">
      <tab-2-content-card @click="openModal(true)"></tab-2-content-card>
    </swiper-slide>
    <swiper-slide value="Total">Slide 3</swiper-slide>
    <swiper-slide value="MyRecipe">Slide 3</swiper-slide>
=======
<<<<<<< Updated upstream
  <swiper>
    <swiper-slide>
      <tab-2-content-card @click="openModal(true)"></tab-2-content-card>
    </swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
=======
  <swiper ref="swiper" :slides-per-view="1" @slideChange="onSlideChange">
    <swiper-slide value="Today">
      <tab-2-content-card
        v-for="(item, index) in 3"
        :key="index"
        @click="openModal(true)"
      ></tab-2-content-card>
    </swiper-slide>
    <swiper-slide value="Total">
      <tab-2-content-card
        v-for="(item, index) in 3"
        :key="index"
        @click="openModal(true)"
      ></tab-2-content-card
    ></swiper-slide>
    <swiper-slide value="MyRecipe">
      <tab-2-content-card
        v-for="(item, index) in 3"
        :key="index"
        @click="openModal(true)"
      ></tab-2-content-card>
    </swiper-slide>
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  </swiper>
  <!-- <teleport to="#tab2"> -->
  <ion-modal
    :is-open="isOpenRef"
    css-class="my-custom-class"
    :swipe-to-close="true"
    @didDismiss="openModal(false)"
  >
    <Modal :title="'타이들'">
      <tab-2-modal-content @emitCloseModal="CloseModal"></tab-2-modal-content>
    </Modal>
  </ion-modal>
</template>
<script lang="ts">
/* tslint:disable:no-unused-variable */
import SwiperCore from "swiper";
import { computed, defineComponent, ref, watch } from "vue";
import { IonicSwiper, IonModal } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import Tab2ContentCard from "./Tab2ContentCard.vue";
import Modal from "./AppModal.vue";
import Tab2ModalContent from "./Tab2ModalContent.vue";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

SwiperCore.use([IonicSwiper]);
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    Modal,
    Tab2ContentCard,
    Tab2ModalContent,
    IonModal,
  },
  props: {
    propSegmentValue: {
      type: String,
      default: "Today",
    },
  },
  emits: ["emitSlideValue"],
  setup(props, { emit }) {
    const swiper: any = ref();
    const segmentValue = computed(() => {
      return props.propSegmentValue;
    });

    const isOpenRef = ref(false);
    //prop으로 받아온 segment 값이 변경되었을 때
    watch(
      () => props.propSegmentValue,
      (newValue, oldValue) => {
        console.log("props.visible 의 변이가 감지되었을 때 ", {
          newValue,
          oldValue,
        });
        swiper.value.$el.swiper.slideTo(newValue);
      }
    );

    //슬라이드 index 값이 변경되면 emit 호출
    const onSlideChange = (event: any) => {
      emit("emitSlideValue", event.activeIndex);
    };

    //모달 상태 설정(열기,닫기)
    const openModal = (state: boolean) => (isOpenRef.value = state);
    const CloseModal = () => {
      isOpenRef.value = false;
    };
    return {
      swiper,
      onSlideChange,
      isOpenRef,
      openModal,
      CloseModal,
      segmentValue,
    };
  },
});
</script>
<style scoped>
.my-custom-class {
  width: 300px;
}
</style>
