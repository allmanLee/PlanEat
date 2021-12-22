<template>
  <ion-card ios="add" mode="ios" Expand="block" @click="ClickButton">
    <ion-card-header>
      <ion-card-title class="card-title">
        <ion-grid class="buttonCard-grid">
          <ion-row>
            <ion-col class="ion-align-self-center" size="auto">{{
              ingredient.name
            }}</ion-col>
            <ion-col class="badge-container" size="auto"
              ><ion-badge color="primary">경고</ion-badge></ion-col
            >
            <ion-col class="text-date ion-align-self-center">
              {{ ingredient.updatedDate }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-title>
    </ion-card-header>
    <ion-card-content v-if="propMemoDisabled">
      {{ ingredient.memo ? ingredient.memo : "메모가 필요하실가요?" }}
    </ion-card-content>
  </ion-card>

  <!-- 재료 수정부 팝업 -->
  <app-popover
    :propOpenPopover="closePopover"
    @closePopover="(closePopover = false), ingreModify(false)"
  >
    <ion-list class="modify-popup">
      <ion-list-header>
        <ion-toolbar>
          <ion-title mode="md">{{ ingredient.name }}</ion-title>
          <ion-button color="dark" slot="end" @click="ingreModify(true)">{{
            modifyMode ? "수정하기" : "취소"
          }}</ion-button>
        </ion-toolbar>
      </ion-list-header>
      <ion-item lines="none">
        <ion-label position="stacked">보관날짜</ion-label>
        <app-input
          :propType="'date'"
          :propValue="ingreUpdatedDate"
          :disabled="modifyMode"
          @ionInput="inputedModifyUpdatedDate = $event.target.value"
        ></app-input>
      </ion-item>
      <ion-item lines="none">
        <ion-label position="stacked">유통기한</ion-label>
        <app-input
          :propType="'date'"
          :propValue="ingreExpirationDate"
          :disabled="modifyMode"
          @ionInput="inputedModifyExpirationDate = $event.target.value"
        ></app-input>
      </ion-item>
      <ion-item lines="none" class="memo-input-item">
        <ion-label position="stacked">메모</ion-label>
        <ion-textarea
          autoGrow="true"
          :disabled="modifyMode"
          :placeholder="ingreMemo"
          :value="ingreMemo"
          maxlength="100"
          @ionInput="inputedModifyMemo = $event.target.value"
        ></ion-textarea>
      </ion-item>
      <ion-footer line="true">
        <ion-button
          expand="block"
          :disabled="modifyMode"
          @click="Modifyingredient()"
        >
          편집완료
        </ion-button>
      </ion-footer>
    </ion-list>
  </app-popover>
</template>
<script lang="ts">
import { computed, defineComponent, ref, PropType } from "vue";
import {
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonBadge,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonListHeader,
  IonLabel,
  IonButton,
  IonToolbar,
  IonFooter,
  IonTitle,
  IonTextarea,
  IonItem,
} from "@ionic/vue";
import AppPopover from "./AppPopover.vue";
import { VueEvent } from "@/types/event";
import { FrigeType } from "@/types/frige";
import AppInput from "./AppInput.vue";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonListHeader,
    IonTitle,
    IonItem,
    IonCardContent,
    IonLabel,
    IonToolbar,
    IonFooter,
    IonButton,
    IonTextarea,
    IonBadge,
    AppPopover,
    AppInput,
  },
  props: {
    propIngredient: {
      type: Object as PropType<FrigeType>,
      default: () => {
        return {
          id: "errId",
          name: "errName",
          updatedDate: new Date(),
          amount: "보통",
        };
      },
    },
    propMemoDisabled: {
      type: Boolean,
      default: false,
    },
    propFrizeId: {
      type: String,
      default: () => {
        return "d22f323f";
      },
    },
  },
  emits: ["emitAddItems"],
  setup(props, { emit }) {
    const store = useStore();
    const ingredient = computed(() => props.propIngredient);

    const closePopover = ref(false);
    const closeMemo = ref(false);
    const formatDate = (date: Date) =>
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const memoModify = ref(false);
    const AddItems = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      emit("emitAddItems", "why");
    };
    const ClickButton = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      closePopover.value = true;
    };

    //팝업 편집 버튼
    const modifyMode = ref(true);

    ////수정될 업데이트 날짜
    const inputedModifyUpdatedDate = ref();
    const ingreUpdatedDate = computed(() => {
      if (modifyMode.value) return props.propIngredient.updatedDate;
      else return inputedModifyUpdatedDate.value;
    });
    ////수정될 유통기간 날짜 _(default 유통기간은 업데이트날자에서 1주일 후로 잡혀있다.)
    const inputedModifyExpirationDate = ref();
    const ingreExpirationDate = computed(() => {
      if (modifyMode.value === true) return props.propIngredient.expirationDate;
      else return inputedModifyExpirationDate.value;
    });
    ////수정될 메모내용 _(default undefinded)
    const inputedModifyMemo = ref();
    const ingreMemo = computed(() => {
      if (modifyMode.value === true) return props.propIngredient.memo;
      else return inputedModifyMemo.value;
    });

    const ingreModify = (toggle: boolean) => {
      if (toggle) modifyMode.value = !modifyMode.value;
      else modifyMode.value = true;

      inputedModifyUpdatedDate.value = undefined;
      inputedModifyExpirationDate.value = undefined;
      inputedModifyMemo.value = undefined;
    };
    const Modifyingredient = () => {
      store
        .dispatch("frige/frizeIngredientModify", {
          frizeId: props.propFrizeId,
          ingredientId: ingredient.value.id,
          frizeModifyData: {
            updatedDate: inputedModifyUpdatedDate.value,
            expirationDate: inputedModifyUpdatedDate.value,
            memo: inputedModifyMemo.value,
          },
        })
        .then(() => {
          closePopover.value = false;
          modifyMode.value = false;
        });
    };
    return {
      modifyMode,
      Modifyingredient,
      ingreModify,
      memoModify,
      closeMemo,
      ingredient,
      closePopover,
      AddItems,
      ClickButton,
      formatDate,
      ingreUpdatedDate,
      ingreExpirationDate,
      ingreMemo,
      inputedModifyMemo,
      inputedModifyExpirationDate,
      inputedModifyUpdatedDate,
    };
  },
});
</script>
<style lang="scss" scoped>
ion-card {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  width: 100%;
  max-width: 375px;
  border: var(--custom-gray-04) 1px solid;
  margin-bottom: 8px;
  margin-top: 8px;
  margin-left: 0;
  margin-right: 0;
  padding: 14px;
  --border-width: 1px;
  --background: white;
}

ion-card-header {
  padding: 0px;
}
ion-card-content {
  margin-top: 4px;
  padding: 0px;
}
.badge-container {
  height: 100%;
  line-height: 100%;
  vertical-align: middle;
  padding-left: 8px;
}
.card-title {
  font-size: 16px;
  padding: 0px;
}
.text-date {
  text-align: end;
  font-size: rem-calc(12px);
  color: var(--custom-gray-02);
  opacity: 0.6;
}
.tab3-popup-button {
  margin-top: 12px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
}
.pop-item {
  font-size: 14px;
  font-weight: 400;
}
#buttonItemList {
  position: relative;
}
.modify-popup {
  ion-list-header {
    padding: 0;
  }
  ion-item {
    --padding-start: 20px;
    --padding-end: 20px;
    --inner-padding-end: 0;
  }
  ion-toolbar {
    ion-button {
      &.button-disabled {
        background-color: gray;
      }
    }
  }
  .memo-input-item {
    --padding-bottom: 20px;
    ion-textarea {
      border-radius: 4px !important;
      border: 2px solid var(--custom-gray-04) !important;
      --padding-start: 16px;
      --padding-end: 16px;
      --padding-top: 16px;
      --padding-bottom: 16px;
    }
  }
  ion-footer {
    padding: {
      left: 20px;
      right: 20px;
      bottom: 20px;
    }
  }
}
</style>
