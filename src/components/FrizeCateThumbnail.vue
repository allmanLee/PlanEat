<template>
  <swiper
    mode="ios"
    id="swiper"
    :slidesPerView="1.5"
    :breakpoints="swiperBreakpoints"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    v-cloak
  >
    <swiper-slide
      v-for="(item, index) of cateItems"
      :value="index"
      :key="item.frizeName"
    >
      <ion-card button @click.passive.self="changeCateBtn($event, index)">
        <ion-card-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button @click.self="openPop(true)">
                <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-card-header>
        <ion-card-content>
          <ion-text class="cate-name-text"> {{ item.frizeName }} </ion-text>
          <ion-text> {{ frizeItemLength }}개 보관중 </ion-text>
        </ion-card-content>
      </ion-card>
    </swiper-slide>
    <swiper-slide></swiper-slide>
  </swiper>
  <app-popover :propOpenPopover="popStatus" @closePopover="openPop(false)">
    <div class="remove-cate-popover">
      <ion-toolbar mode="md">
        <ion-title mode="md"> {{ frizeSeletedName }}</ion-title>
      </ion-toolbar>

      <ion-text
        ><span class="main-text">해당 카테고리를 삭제하시겠습니까?</span
        ><br /><br />
        카테고리를 삭제하면 이 카테고리에 추가되었던 재료가 모두 삭제되며 복원할
        수 없습니다.</ion-text
      >
      <ion-footer mode="ios">
        <ion-button
          mode="ios"
          expand="block"
          color="medium"
          fill="outline"
          @click="openPop(false)"
        >
          닫기
        </ion-button>
        <ion-button
          color="danger"
          expand="block"
          @click="deleteCate(), openPop(false)"
          @closePopover="openPop(false)"
        >
          삭제하기
        </ion-button>
      </ion-footer>
    </div>
  </app-popover>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed, watch } from "vue";
import {
  IonText,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButtons,
  IonIcon,
  IonButton,
  IonToolbar,
  IonTitle,
  IonFooter,
  loadingController,
} from "@ionic/vue";
import SwiperCore from "swiper";
import { IonicSwiper } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useStore } from "@/store/index";
import "swiper/swiper.scss";
import AppPopover from "@/components/AppPopover.vue";
import "swiper/components/navigation/navigation.scss";
import {
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
  setup(prop, { emit }) {
    const store = useStore();
    //카테고리 목 아이템배열
    const cateItems = computed(() => store.state.frige.frizeCate);
    const cateIndex = ref(0);
    const cateId = computed(() => {
      return store.state.frige.selectedCateId;
    });

    //팝업 열기/닫기
    const popStatus = ref(false);
    const openPop = (state: boolean) => {
      popStatus.value = state;
    };

    //로딩 스플레시
    const loadingSinner = async () => {
      return await loadingController.create({
        spinner: "bubbles",
        mode: "ios",
        duration: 20000,
        message: "보관함을 가져오고 있어요",
        translucent: true,
        cssClass: "custom-class custom-loading",
        backdropDismiss: false,
      });
    };

    //렌더링시 스와이퍼 사이즈 조정
    const swiperBreakpoints = {
      // when window width is >= 320px
      320: {
        slidesPerView: 2.3,
        spaceBetween: 10,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
    };

    //스와이퍼 초기화
    const onSwiper = (swiper: any) => {
      cateIndex.value = swiper.snapIndex;
      cateItems.value.forEach((el, index) => {
        if (el.frizeId === cateId.value) cateIndex.value = index;
      });
      swiper.slideTo(cateIndex.value);
    };

    //슬라이드가 바뀔때 1초동안 동작이 없으면 마지막 index 값으로 cate값 실행
    let changeIdxPrevent = setTimeout(() => {
      console.log("이벤트");
    }, 1000);

    const onSlideChange = async (swiper: any) => {
      clearTimeout(changeIdxPrevent);
      cateIndex.value = swiper.snapIndex;
      changeIdxPrevent = setTimeout(() => {
        loadingSinner().then((data) => data.present());
        store.commit(
          "frige/fetchFrizeCateSelected",
          cateItems.value[cateIndex.value].frizeId
        );
        store
          .dispatch("frige/frizeIngredientGet", {
            frizeId: cateItems.value[cateIndex.value].frizeId,
          })
          .then(() => {
            loadingController.dismiss();
          });
      }, 1000);
    };

    watch(cateId, (id: any, oldId: any) => {
      if (cateItems.value !== undefined && cateId.value !== undefined) {
        cateItems.value.forEach((el, index) => {
          if (el.frizeId === cateId.value) cateIndex.value = index;
        });
      }
    });

    //선택 카테고리 변경
    const changeCateBtn = (event: any, index: number) => {
      const swiper = event.target.parentNode.parentNode.parentNode.swiper;
      swiper.slideTo(index);
      cateIndex.value = index;
    };

    //냉장고 아이디로
    const frizeSeletedId = computed(() => store.state.frige.selectedCateId);

    //냉장고 이름
    const frizeSeletedName = computed(() =>
      store.getters["frige/getCateName"](frizeSeletedId.value)
    );
    //냉장고 재료수
    const frizeItemLength = computed(() =>
      store.getters["frige/getCateLength"](cateIndex.value)
    );
    //카테고리 삭제
    const deleteCate = () => {
      const swiperDom = document.getElementById("swiper") as any;
      if (cateItems.value.length > 1) {
        loadingSinner().then((data) => data.present());
        store
          .dispatch("frige/frizeDelete", {
            frizeName: frizeSeletedName.value,
          })
          .then(() => {
            store.commit("frige/initFrizeCateselected");
            if (cateIndex.value === 0) {
              onSlideChange(swiperDom.swiper);
              console.log("frizeCateThumbnail: cateIndex = 0");
            } else swiperDom.swiper.slideTo(0);
            loadingController.dismiss();
          });
      } else
        alert(
          "냉장고를 삭제할 수 없습니다.\n최소 한 개의 냉장고가 있어야 합니다."
        );
    };
    return {
      deleteCate,
      cateItems,
      cateIndex,
      swiperBreakpoints,
      trashOutline,
      closeOutline,
      frizeItemLength,
      notificationsOutline,
      changeCateBtn,
      onSlideChange,
      frizeSeletedName,
      onSwiper,
      popStatus,
      openPop,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButtons,
    IonText,
    IonIcon,
    IonTitle,
    IonFooter,
    AppPopover,
  },
});
</script>

<style lang="scss" scoped>
.content {
  margin-left: 16px;
  margin-right: 16px;
}
.swiper-wrapper {
  .swiper-slide {
    ion-card {
      background: var(--custom-gray-05);
      border-radius: 16px;
      box-shadow: none;
      margin-left: 16px;
      margin-right: auto;
      margin-top: 8px;
      margin-bottom: 8px;
      padding: 0px;
      widows: 60px;
      width: 140px;
      min-height: rem-calc(112px);
      transition: all 0.4s ease-in-out;
    }
    ion-card-header {
      display: none;
      pointer-events: none;
      padding: 8px;
      padding-bottom: 0px;
      ion-toolbar {
        --padding-bottom: 0px;
        --padding-top: 0px;
        --background: none !important;
        --min-height: 20px;
        ion-buttons {
          ion-button {
            pointer-events: all;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 20px;
            width: 24px;
            height: 24px;
            ion-icon {
              color: white;
              font-size: rem-calc(18px);
            }
          }
        }
      }
    }
    ion-card-content {
      min-height: rem-calc(112px);
      padding-top: 40px;
      pointer-events: none;
      text-align: center;
      ion-text {
        display: none;
        color: black;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.cate-name-text {
          display: block;
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
    &.swiper-slide-active {
      ion-card {
        background: var(--ion-color-primary);
        border-radius: 16px;
        box-shadow: rgb(0 0 0 / 12%) 0px 4px 16px;
        margin-left: 16px;
        margin-right: auto;
        margin-top: 0px;
        margin-bottom: 16px;
        padding: 0px;
        widows: 60px;
      }
      ion-card-header {
        display: block;
        padding: 8px;
        padding-bottom: 0px;
        ion-toolbar {
          --padding-bottom: 0px;
          --padding-top: 0px;
          --background: none !important;
          --min-height: 20px;
          ion-buttons {
            ion-button {
              ion-icon {
                font-size: rem-calc(18px);
              }
            }
          }
        }
      }
      ion-card-content {
        min-height: rem-calc(0px);
        padding: 16px;
        padding-top: 0px;
        text-align: left;
        ion-text {
          display: block;
          color: white;
          &.cate-name-text {
            display: block;
          }
        }
      }
    }
  }
}
// 삭제 모달
.remove-cate-popover {
  padding: 16px;
  padding-top: 8px;
  ion-toolbar {
    ion-title {
      padding-left: 0px;
      font-weight: 600;
      .toolbar-title {
        min-width: 300px;
      }
    }
  }
  .main-text {
    font-size: 16px;
    color: black;
  }
  ion-footer {
    margin-top: 60px;
    ion-button.button-outline {
      --background-activated: white;
    }

    ion-button {
      margin-top: 12px;
    }
  }
}
</style>