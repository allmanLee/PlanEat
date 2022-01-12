<template>
  <ion-page>
    <ion-row>
      <frize-cate-thumbnail :propCates="testMock"></frize-cate-thumbnail>
    </ion-row>
    <ion-row
      justify-content-center
      class="cate-toolbar ion-padding-start ion-margin-top"
    >
      <ion-col class="memo-btn-container"
        ><ion-button
          mode="ios"
          color="dark"
          fill="clear"
          class="memotoggle-btn"
          @click="memoDisabled = !memoDisabled"
          >{{ memoDisabled ? "메모 끄기" : "메모 켜기" }}</ion-button
        ><ion-button
          mode="ios"
          color="dark"
          fill="clear"
          class="memotoggle-btn"
          @click="openPop(true)"
          >카테고리 삭제</ion-button
        ></ion-col
      >
    </ion-row>

    <!--컨텐츠-->
    <ion-content>
      <tab-3-list-buttons :propMemoDisabled="memoDisabled"></tab-3-list-buttons>
    </ion-content>

    <!--삭제 모달-->
    <app-popover :propOpenPopover="popStatus" @closePopover="openPop(false)">
      <div class="remove-cate-popover">
        <ion-toolbar mode="md">
          <ion-title mode="md"> {{ frizeSeletedName }}</ion-title>
        </ion-toolbar>

        <ion-text
          ><span class="main-text">해당 카테고리를 삭제하시겠습니까?</span
          ><br /><br />
          카테고리를 삭제하면 이 카테고리에 추가되었던 재료가 모두 삭제되며
          복원할 수 없습니다.</ion-text
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
    <fab-button-add :propFrizeId="frizeSeletedId"></fab-button-add>
  </ion-page>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import AppPopover from "@/components/AppPopover.vue";
import FabButtonAdd from "@/components/FabButtonAdd.vue";
import {
  IonPage,
  IonContent,
  IonFooter,
  IonRow,
  IonButton,
  IonCol,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/vue";
import FrizeCateThumbnail from "@/components/FrizeCateThumbnail.vue";
import Tab3ListButtons from "@/components/Tab3ListButtons.vue";
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
    const testMock = ref(store.state.frige.frizeCate);

    //팝업 열기/닫기
    const popStatus = ref(false);
    const openPop = (state: boolean) => {
      popStatus.value = state;
    };

    //냉장고 아이디로
    const frizeSeletedId = computed(() => store.state.frige.selectedCateId);

    //냉장고 이름
    const frizeSeletedName = computed(() =>
      store.getters["frige/getCateName"](frizeSeletedId.value)
    );

    //냉장고 [이름, 아이디] 가져오기
    store
      .dispatch("frige/AllFrizeGet", {
        email: localStorage.getItem("email"),
      })
      .then(() => {
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
            store.commit("frige/initFrizeCateselected");
          });
      } else
        alert(
          "냉장고를 삭제할 수 없습니다.\n최소 한 개의 냉장고가 있어야 합니다."
        );
    };
    const slideOpts = {
      slidesPerView: 5.5,
    };
    const stringSlice = (string: string) => {
      return string.slice(0, 2);
    };

    //메모 표시하기
    const memoDisabled = ref(true);

    return {
      testMock,

      slideOpts,
      addOutline,

      closeOutline,
      deleteCate,
      trashOutline,
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
    IonTitle,
    IonToolbar,
    IonText,
    FrizeCateThumbnail,
    FabButtonAdd,
    Tab3ListButtons,
    AppPopover,
    IonFooter,
    IonRow,
    IonButton,
    IonCol,
  },
});
</script>

<style lang="scss" scoped>
ion-row {
  padding-left: 0px;
}
ion-content {
  --padding-start: 0px;
  --padding-end: 0px;
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
      right: 0px;
    }
    height: 36px;
    font: {
      size: 14px;
    }
  }
}
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