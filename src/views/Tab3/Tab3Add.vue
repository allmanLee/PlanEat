<template>
  <ion-page mode="ios">
    <ion-card class="cate-card">
      <ion-card-header>
        <ion-card-title>냉장고</ion-card-title>
        <ion-button @click="openPop(true)">
          <ion-icon slot="icon-only" :icon="add"></ion-icon>
        </ion-button>
      </ion-card-header>
      <ion-card-content>
        <frize-cate-thumbnail :propCates="testMock"></frize-cate-thumbnail>
      </ion-card-content>
    </ion-card>

    <ion-toolbar mode="md">
      <ion-title mode="md"> {{ frizeSeletedName }}</ion-title>
      <ion-buttons slot="end">
        <ion-label>메모</ion-label>
        <ion-toggle checked @click="memoDisabled = !memoDisabled"></ion-toggle>
      </ion-buttons>
    </ion-toolbar>
    <ion-content class="card-list-content">
      <tab-3-list-buttons :propMemoDisabled="memoDisabled"></tab-3-list-buttons>
    </ion-content>

    <!--삭제 모달-->
    <app-popover
      :propOpenPopover="popStatus"
      @closePopover="openPop(false), (inputedName = '')"
    >
      <div class="add-cate-popover">
        <ion-toolbar mode="md">
          <ion-title mode="md">카테고리 추가</ion-title>
        </ion-toolbar>
        <app-input
          :propPlaceholder="'냉장고 이름'"
          :propValue="inputedName"
          @ionInput="inputedName = $event.target.value"
        ></app-input>
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
            mode="ios"
            expand="block"
            @click="addCateSubmit(), openPop(false)"
          >
            추가하기
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
import AppInput from "@/components/AppInput.vue";
import FabButtonAdd from "@/components/FabButtonAdd.vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonLabel,
  IonToggle,
  IonFooter,
  IonButton,
  IonButtons,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import FrizeCateThumbnail from "@/components/FrizeCateThumbnail.vue";
import Tab3ListButtons from "@/components/Tab3ListButtons.vue";
import { useStore } from "@/store/index";
import {
  addOutline,
  trashOutline,
  add,
  notificationsOutline,
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

    //카테고리 추가 완료(팝업 안에서)
    const inputedName = ref("");
    const addCateSubmit = () => {
      if (inputedName.value.length >= 2) {
        store.dispatch("frige/frizeAdd", {
          email: localStorage.getItem("email"),
          frizeName: inputedName.value,
        });
      } else alert("두자리 이상의 값을 입력해주세요");
      inputedName.value = "";
    };

    //메모 표시하기
    const memoDisabled = ref(true);

    return {
      testMock,
      addOutline,
      add,
      addCateSubmit,
      trashOutline,
      frizeSeletedName,
      notificationsOutline,
      inputedName,
      openPop,
      popStatus,
      frizeSeletedId,
      memoDisabled,
    };
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonPage,
    IonLabel,
    IonToggle,
    IonContent,
    AppInput,
    IonTitle,
    IonToolbar,
    FrizeCateThumbnail,
    FabButtonAdd,
    IonButtons,
    Tab3ListButtons,
    AppPopover,
    IonFooter,
    IonButton,
  },
});
</script>

<style lang="scss" scoped>
ion-card {
  border-radius: 0px;
  margin: 0px;
  box-shadow: none;
  padding-bottom: 20px;
  ion-card-header {
    margin: 16px;
    padding: 0px;
    position: relative;
    ion-card-title {
      font-size: rem-calc(18px);
      font-weight: 600;
    }

    ion-button {
      position: absolute;
      right: 0px;
      top: 0px;
      width: 32px;
      height: 32px;
      --background: rgb(255, 247, 239);
      --background-activated: rgb(255, 255, 255);
      --padding-start: 0px;
      --padding-end: 0px;
      --padding-top: 0px;
      --padding-bottom: 0px;
      transition: all 0.5s ease-in-out;
      &.ion-activated {
        transform: scale(1.4);
      }
      ion-icon {
        color: var(--ion-color-primary);
        font-size: 18px;
      }
    }
  }
  ion-card-content {
    padding: 0px;
  }
}

ion-content.card-list-content {
  --background: rgb(255, 247, 239);
  --padding-start: 0px;
  --padding-end: 0px;
}

ion-toolbar {
  --background: white;
  border: {
    top: 1px solid var(--custom-gray-04);
    bottom: 1px solid var(--custom-gray-04);
  }
  ion-toggle {
    --background-checked: rgb(255, 187, 118);
  }
  font-size: rem-calc(12px);
}

.add-cate-popover {
  padding: 16px;
  padding-top: 8px;

  ion-toolbar {
    margin-bottom: 16px;
    ion-title {
      padding-left: 0px;
      font-weight: 600;
      .toolbar-title {
        min-width: 300px;
      }
    }
    ion-buttons {
      ion-button {
        min-height: rem-calc(44px);
        margin-top: 0 !important;
      }
    }
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
