<template>
  <ion-page>
    <ion-row>
      <frize-cate-thumbnail :propCates="testMock"></frize-cate-thumbnail>
    </ion-row>
    <ion-row
      justify-content-center
      class="cate-toolbar ion-padding-start ion-margin-top"
    >
      <ion-col v-for="(button, index) of toolBtnItems" size="auto" :key="index">
        <ion-button
          color="dark"
          fill="clear"
          class="cate-tool-btn"
          @click="button.clickEvent(true)"
        >
          <ion-icon :icon="button.icon"></ion-icon>
        </ion-button>
      </ion-col>
      <ion-col class="memo-btn-container"
        ><ion-button
          color="dark"
          fill="clear"
          class="memotoggle-btn"
          @click="memoDisabled = !memoDisabled"
          >{{ memoDisabled ? "메모 끄기" : "메모 켜기" }}</ion-button
        ></ion-col
      >
    </ion-row>

    <!--컨텐츠-->
    <ion-content>
      <tab-3-list-buttons :propMemoDisabled="memoDisabled"></tab-3-list-buttons>
    </ion-content>
    <app-popover :propOpenPopover="popStatus">
      <div class="remove-cate-popover">
        <ion-toolbar>
          <ion-title> 냉장고 삭제 </ion-title>
          <ion-buttons slot="end">
            <ion-button color="dark" @click="openPop(false)">
              <ion-icon :icon="closeOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-text
          ><span>{{ frizeSeletedName }}</span
          ><br />정말로 삭제하시겠습니까?</ion-text
        >
        <ion-button
          color="danger"
          expand="block"
          @click="deleteCate(), openPop(false)"
        >
          삭제하기
        </ion-button>
      </div>
    </app-popover>
    <fab-button-add :propFrizeId="frizeSeletedId"> </fab-button-add>
  </ion-page>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import AppPopover from "@/components/AppPopover.vue";
import FabButtonAdd from "@/components/FabButtonAdd.vue";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonRow,
  IonButton,
  IonCol,
  IonTitle,
  IonButtons,
  IonToolbar,
  IonText,
} from "@ionic/vue";
import FrizeCateThumbnail from "@/components/FrizeCateThumbnail.vue";
import Tab3ListButtons from "@/components/Tab3ListButtons.vue";
import ingredientAPI from "@/assets/api/ingredientAPI";
import { useStore } from "@/store/index";
import {
  addOutline,
  trashOutline,
  notificationsOutline,
  closeOutline,
} from "ionicons/icons";
export default defineComponent({
  setup() {
    const store = useStore();
    const cateIndex = ref(0);
    const testMock = ref(store.state.frige.frizeCate);

    //팝업 열기/닫기
    const popStatus = ref(false);
    const openPop = (state: boolean) => {
      popStatus.value = state;
    };

    //냉장고 아이디로
    const frizeSeletedId = computed(() => store.state.frige.selectedCateId);
    //재료 데이터 가져오기(식약처 API)
    ingredientAPI.GetIngredientData().then((data) => {
      console.log(data);
    });

    //냉장고 이름
    const frizeSeletedName = computed(() =>
      store.getters["frige/getCateName"](frizeSeletedId.value)
    );

    //냉장고 [이름, 아이디] 가져오기
    store
      .dispatch("frige/AllFrizeGet", {
        email: localStorage.getItem("email"),
      })
      .then((data) => {
        store.commit("frige/initFrizeCateselected");
        testMock.value = store.state.frige.frizeCate;
        store.dispatch("frige/frizeIngredientGet", {
          frizeId: frizeSeletedId.value,
        });
      });

    //카테고리 삭제
    const deleteCate = () => {
      if (testMock.value.length > 1) {
        store
          .dispatch("frige/frizeDelete", {
            email: localStorage.getItem("email"),
            frizeName: frizeSeletedName.value,
          })
          .then(() => {
            testMock.value = store.state.frige.frizeCate;
          });
      } else
        alert(
          "냉장고를 삭제할 수 없습니다. 최소 한개의 냉장고가 있어야합니다."
        );
    };
    //간편 알람 설정
    const toggleAlarm = () => {
      console.log("알람 설정");
      return undefined;
    };

    //툴바 버튼
    const toolBtnItems = [
      { icon: trashOutline, clickEvent: openPop },
      { icon: notificationsOutline, clickEvent: toggleAlarm },
    ];
    const slideOpts = {
      slidesPerView: 5.5,
    };
    const stringSlice = (string: string) => {
      return string.slice(0, 2);
    };

    //메모 표시하기
    const memoDisabled = ref(false);

    return {
      testMock,
      toolBtnItems,

      slideOpts,
      addOutline,

      closeOutline,
      deleteCate,
      trashOutline,
      toggleAlarm,
      notificationsOutline,
      stringSlice,
      openPop,
      popStatus,
      frizeSeletedName,
      frizeSeletedId,
      memoDisabled,
    };
  },
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonText,
    FrizeCateThumbnail,
    FabButtonAdd,
    Tab3ListButtons,
    AppPopover,
    IonRow,
    IonButton,
    IonCol,
  },
});
</script>

<style lang="scss" scoped>
.content {
  margin-left: 16px;
  margin-right: 16px;
}
.cate-toolbar {
  background: var(--custom-gray-05);
  .cate-tool-btn {
    width: 48px;
    height: 48px;
    --padding-start: 0;
    --padding-end: 0;
  }
  ion-icon {
    font-size: rem-calc(24px);
  }
  .memo-btn-container {
    --padding-end: 16px;
    text-align: right;
  }
  .memotoggle-btn {
    margin: {
      top: 6px;
      bottom: 6px;
      right: 16px;
    }
    height: 36px;
    font: {
      size: 14px;
    }
  }
}
.remove-cate-popover {
  padding: 8px;
  text-align: center;
  ion-toolbar {
    margin-bottom: 4px;
    ion-title {
      min-width: 120px;
    }
    ion-buttons {
      ion-button {
        margin-top: 0 !important;
      }
    }
  }
  ion-text {
    span {
      font-size: rem-calc(16px);
      font-weight: 500;
    }
  }
  ion-button {
    margin-top: 16px;
  }
}
</style>