<template>
  <swiper>
    <swiper-slide>
      <tab-2-content-card @click="openModal(true)"></tab-2-content-card>
    </swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
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
import { defineComponent, ref } from "vue";
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

  setup() {
    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };
    const isOpenRef = ref(false);
    const onSlideChange = () => {
      console.log("slide change");
    };
    const openModal = (state: boolean) => (isOpenRef.value = state);
    const CloseModal = () => {
      isOpenRef.value = false;
    };
    return {
      onSwiper,
      onSlideChange,
      isOpenRef,
      openModal,
      CloseModal,
    };
  },
});
</script>
<style scoped>
.my-custom-class {
  width: 300px;
}
</style>
