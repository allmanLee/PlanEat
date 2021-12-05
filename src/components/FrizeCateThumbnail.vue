<template>
  <swiper :slides-per-view="6">
    <swiper-slide value="add">
      <ion-col size="auto">
        <ion-thumbnail>
          <ion-button color="dark" fill="clear" @click="openPop(true)">
            <ion-icon :icon="addOutline"></ion-icon>
          </ion-button>
          <app-popover :propOpenPopover="popStatus">
            <div class="add-cate-popover">
              <ion-toolbar>
                <ion-title> 냉장고 추가 </ion-title>
                <ion-buttons slot="end">
                  <ion-button color="dark" @click="openPop(false)">
                    <ion-icon :icon="closeOutline"></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-toolbar>
              <app-input
                :propPlaceholder="'냉장고 이름'"
                :propValue="inputedName"
                @ionInput="inputedName = $event.target.value"
              ></app-input>
              <ion-button expand="block" @click="addCateBtn(), openPop(false)">
                추가하기
              </ion-button>
            </div>
          </app-popover>
        </ion-thumbnail>
        <ion-text>추가하기</ion-text>
      </ion-col>
    </swiper-slide>
    <swiper-slide
      v-for="(item, index) of cateItems"
      :value="index"
      :key="item.frizeName"
    >
      <ion-col size="auto">
        <ion-thumbnail
          :class="
            index === cateIndex ? 'ios hydrated cate-focus' : 'ios hydrated'
          "
        >
          <ion-button color="dark" fill="clear" @click="changeCateBtn(index)">
            <div class="thumbnail-none">
              {{ stringSlice(item.frizeName) }}
            </div>
          </ion-button>
        </ion-thumbnail>
        <ion-text> {{ item.frizeName }} </ion-text>
      </ion-col>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, computed } from "vue";
import {
  IonIcon,
  IonText,
  IonButton,
  IonButtons,
  IonTitle,
  IonCol,
  IonToolbar,
  IonThumbnail,
} from "@ionic/vue";
import SwiperCore from "swiper";
import { IonicSwiper } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
// import Tab3ListButtons from "@/components/Tab3ListButtons.vue";
import AppInput from "@/components/AppInput.vue";
import AppPopover from "@/components/AppPopover.vue";
import { useStore } from "@/store/index";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import {
  addOutline,
  trashOutline,
  notificationsOutline,
  closeOutline,
} from "ionicons/icons";
import { FrigeCate } from "@/types/frige";
SwiperCore.use([IonicSwiper]);

export default defineComponent({
  props: {
    propCates: {
      type: Array as PropType<FrigeCate[]>,
      require: true,
    },
  },
  emit: ["emitCateIndex"],
  setup(prop, { emit }) {
    const store = useStore();
    //카테고리 목 아이템배열
    const cateItems = computed(() => prop.propCates);
    const cateIndex = ref(0);

    //선택 카테고리 변경
    const changeCateBtn = (index: number) => {
      cateIndex.value = index;
      emit("emitCateIndex", cateIndex);
    };
    //팝업 열기/닫기
    const popStatus = ref(false);
    const openPop = (state: boolean) => {
      popStatus.value = state;
    };
    //카테고리 추가
    const inputedName = ref("");
    const addCateBtn = () => {
      store.dispatch("frige/frizeAdd", {
        email: localStorage.getItem("email"),
        frizeName: inputedName.value,
      });
    };

    //문자열 자르기
    const stringSlice = (string: string) => {
      if (string) {
        return string.slice(0, 2);
      }
    };

    return {
      popStatus,
      addOutline,
      cateItems,
      cateIndex,
      trashOutline,
      closeOutline,
      notificationsOutline,
      stringSlice,
      changeCateBtn,
      inputedName,
      addCateBtn,
      openPop,
    };
  },
  components: {
    AppPopover,
    AppInput,
    Swiper,
    SwiperSlide,
    IonToolbar,
    IonThumbnail,
    // Tab3ListButtons,
    IonButton,
    IonButtons,
    IonTitle,
    IonCol,
    IonIcon,
    IonText,
  },
});
</script>

<style lang="scss" scoped>
.content {
  margin-left: 16px;
  margin-right: 16px;
}
.swiper-container {
  width: 100vw;
  margin-left: 16px;
}
.swiper-wrapper {
  .swiper-slide {
    ion-col {
      ion-thumbnail {
        text-align: center;
        min-width: rem-calc(48px);
        min-height: rem-calc(48px);
        border-radius: 12px;
        margin: 0 auto;
        border: 1.4px solid var(--custom-gray-04);
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
        &.cate-focus {
          border: 1.4px solid var(--ion-color-primary);
          ion-button {
            .thumbnail-none {
              color: black;
            }
          }
        }
        ion-button {
          --padding-start: 0;
          --padding-end: 0;

          .thumbnail-none {
            line-height: rem-calc(48px);
            vertical-align: middle;
            color: grey;
          }
          ion-icon {
            font-size: 1.6rem;
          }
          img {
            border-radius: 20px;
          }
        }
      }
      ion-text {
        display: block;
        text-align: center;
        margin-top: rem-calc(4px);
        margin-left: 0;
        margin-right: 0;
        width: 100%;
        font-size: rem-calc(12px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  ion-slide:nth-of-type(1) {
    ion-col ion-thumbnail {
      border: none !important;
      background: var(--custom-gray-05);
    }
  }
}
.add-cate-popover {
  padding: 8px;

  ion-toolbar {
    margin-bottom: 16px;
    ion-title {
      min-width: 120px;
    }
    ion-buttons {
      ion-button {
        margin-top: 0 !important;
      }
    }
  }
  ion-button {
    margin-top: 16px;
  }
}
</style>