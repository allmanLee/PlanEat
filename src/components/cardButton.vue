<template>
  <ion-card ios="add" mode="ios" Expand="block" @click="ClickButton">
    <ion-card-header>
      <ion-card-title>
        <ion-grid class="buttonCard-grid">
          <ion-row>
            <ion-col class="ion-align-self-center" size="auto">{{
              ingredient.name
            }}</ion-col>
            <ion-col
              v-if="expirationDateTag < 3"
              class="badge-container"
              size="auto"
              ><ion-badge :color="expirationDateTagColor">{{
                expirationDateTagName
              }}</ion-badge></ion-col
            >
            <ion-col class="text-date ion-align-self-center">
              {{ koreanExpirationDate }}
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
    <ion-list v-if="!propAddMode" class="modify-popup">
      <ion-list-header>
        <ion-toolbar>
          <ion-title mode="ios">{{ ingredient.name }} </ion-title>
        </ion-toolbar>
      </ion-list-header>
      <ion-item lines="none">
        <ion-label position="stacked">보관날짜</ion-label>
        <transition name="fade" mode="out-in">
          <ion-text v-if="modifyMode">{{ ingreUpdatedDate }}</ion-text>
          <app-input
            v-else
            :propType="'date'"
            :propValue="ingreUpdatedDate"
            :disabled="modifyMode"
            @ionInput="inputedModifyUpdatedDate = $event.target.value"
          ></app-input>
        </transition>
      </ion-item>
      <ion-item lines="none">
        <ion-label position="stacked"
          >유통기한<span v-if="expirationDateTag < 3" class="badge-container"
            ><ion-badge :color="expirationDateTagColor">{{
              expirationDateTagName
            }}</ion-badge></span
          ></ion-label
        >
        <transition name="fade" mode="out-in">
          <ion-text v-if="modifyMode">{{ ingreExpirationDate }}</ion-text>
          <app-input
            v-else
            :propType="'date'"
            :propValue="ingreExpirationDate"
            :disabled="modifyMode"
            @ionInput="inputedModifyExpirationDate = $event.target.value"
          ></app-input>
        </transition>
      </ion-item>
      <ion-item lines="none" class="memo-input-item">
        <ion-label position="stacked">메모</ion-label>
        <transition name="fade" mode="out-in">
          <ion-text v-if="modifyMode">{{ ingreMemo }}</ion-text>
          <ion-textarea
            v-else
            autoGrow="true"
            :disabled="modifyMode"
            :placeholder="ingreMemo"
            :value="ingreMemo"
            maxlength="100"
            @ionInput="inputedModifyMemo = $event.target.value"
          ></ion-textarea>
        </transition>
      </ion-item>

      <ion-footer line="true">
        <ion-toolbar>
          <ion-buttons slot="end">
            <transition name="fade">
              <ion-button
                v-if="!modifyMode"
                expand="block"
                fill="solid"
                :disabled="modifyMode"
                @click="Modifyingredient()"
              >
                편집완료
              </ion-button>
            </transition>
            <transition name="fade" mode="out-in">
              <ion-button
                color="dark"
                @click="ingreModify(true)"
                :key="modifyMode"
                >{{ modifyMode ? "수정하기" : "원래대로" }}</ion-button
              >
            </transition>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </ion-list>
    <ion-list v-if="propAddMode">
      <ion-list-header>{{ ingredient.name }}</ion-list-header>
      <ion-item button @click="deleteIngredient()">삭제</ion-item>
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
  IonText,
  IonTextarea,
  IonItem,
  IonButtons,
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
    IonText,
    IonTextarea,
    IonBadge,
    AppPopover,
    AppInput,
    IonButtons,
  },
  props: {
    propIngredient: {
      type: Object as PropType<FrigeType>,
      default: () => {
        return {
          id: "errId",
          name: "errName",
          updatedDate: "errDate",
          amount: "보통",
        };
      },
    },
    propMemoDisabled: {
      type: Boolean,
      default: false,
    },
    propAddMode: {
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
  emits: ["emitAddItems", "emitDelete"],
  setup(props, { emit }) {
    const store = useStore();
    const ingredient = computed(() => props.propIngredient);

    const closePopover = ref(false);
    const closeMemo = ref(false);

    const fillZero = (number: number) => {
      const toString = String(number);
      if (String(number).length !== 2) return String(0) + toString;
      else return toString;
    };

    const formatDate = (date: string) => {
      const upDateArr = date.split("-").map((el) => Number(el));
      const upDate = new Date(
        `${upDateArr[0]}/${upDateArr[1]}/${upDateArr[2]}`
      );

      return `${upDate.getFullYear()}-${fillZero(
        upDate.getMonth() + 1
      )}-${fillZero(upDate.getDate())}`;
    };

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

    const koreanExpirationDate = computed(() => {
      const expirationDate = props.propIngredient.expirationDate;
      if (!expirationDate) return;
      return expirationDate
        .split("-")
        .map((el, index) => {
          if (index === 0) return el + "년";
          else if (index === 1) return el + "월";
          else return el + "일";
        })
        .join(" ");
    });
    const ingreUpdatedDate = computed(() => {
      if (!props.propIngredient.updatedDate) return;
      return formatDate(props.propIngredient.updatedDate);
    });
    ////수정될 유통기간 날짜 _(default 유통기간은 업데이트날자에서 10일 후로 잡혀있다.)
    const inputedModifyExpirationDate = ref();
    const ingreExpirationDate = computed(() => {
      if (!props.propIngredient.expirationDate) return;
      return formatDate(props.propIngredient.expirationDate);
    });
    ////수정될 메모내용 _(default undefinded)
    const inputedModifyMemo = ref();
    const ingreMemo = computed(() => {
      if (modifyMode.value === true) return props.propIngredient.memo;
      else return inputedModifyMemo.value;
    });

    //유통기한-보관날짜 (11일이상: 보통 / 10일이하 경고 / 4일이하 위험)
    const expirationDateTag = computed(() => {
      let upDate = new Date();
      let exDate = new Date();
      if (
        ingredient.value.expirationDate !== undefined &&
        ingredient.value.updatedDate !== undefined
      ) {
        const exDateArr = ingredient.value.expirationDate
          .split("-")
          .map((el) => Number(el));
        const upDateArr = ingredient.value.updatedDate
          .split("-")
          .map((el) => Number(el));
        upDate = new Date(
          `${upDateArr[0]}/${upDateArr[1]}/${upDateArr[2] + 1}`
        );
        exDate = new Date(
          `${exDateArr[0]}/${exDateArr[1]}/${exDateArr[2] + 1}`
        );
      }
      console.log(upDate);
      const dateDifference =
        (exDate.getTime() - upDate.getTime()) / (1000 * 60 * 60 * 24);
      if (dateDifference < 0) return 0;
      else if (dateDifference === 0) return 1;
      else if (dateDifference <= 7) return 2;
      else return 3;
    });
    const expirationDateTagName = computed(() => {
      const tagValue = expirationDateTag.value;
      if (tagValue === 0) return "지남";
      else if (tagValue === 1) return "오늘";
      else if (tagValue === 2) return "주의";
      else return "보통";
    });
    const expirationDateTagColor = computed(() => {
      const tagValue = expirationDateTag.value;
      if (tagValue === 0) return "medium";
      else if (tagValue === 1) return "danger";
      else if (tagValue === 2) return "warning";
      else return "success";
    });

    const ingreModify = (toggle: boolean) => {
      if (toggle) modifyMode.value = !modifyMode.value;
      else modifyMode.value = true;

      inputedModifyUpdatedDate.value = undefined;
      inputedModifyExpirationDate.value = undefined;
      inputedModifyMemo.value = undefined;
    };
    //수정 버튼 클릭
    const Modifyingredient = () => {
      store
        .dispatch("frige/frizeIngredientModify", {
          frizeId: props.propFrizeId,
          ingredientId: ingredient.value.id,
          frizeModifyData: {
            updatedDate: inputedModifyUpdatedDate.value,
            expirationDate: inputedModifyExpirationDate.value,
            memo: inputedModifyMemo.value,
          },
        })
        .then(() => {
          closePopover.value = false;
          modifyMode.value = false;
        });
    };
    //삭제 버튼 클릭(재료 추가)
    const deleteIngredient = () => {
      emit("emitDelete", ingredient.value.id);
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
      deleteIngredient,
      koreanExpirationDate,
      expirationDateTag,
      expirationDateTagName,
      expirationDateTagColor,
    };
  },
});
</script>
<style lang="scss" scoped>
ion-card {
  box-sizing: border-box;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: auto;
  border: var(--custom-gray-04) 1px solid;
  margin-bottom: 8px;
  margin-top: 8px;
  margin-left: 0;
  margin-right: 0;
  padding: 16px;
  --border-width: 1px;
  --background: white;
  transition: all 0.5s ease;
  ion-card-header {
    padding: 0px;
    ion-card-title {
      font-size: 16px;
      padding: 0px;
    }
  }
  ion-card-content {
    margin-top: 4px;
    padding: 0px;
    transition: all 0.5s ease;
  }
}

.badge-container {
  height: 100%;
  line-height: 100%;
  padding-top: 2px;
  vertical-align: middle;
  padding-left: 8px;
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

//팝업부분
.modify-popup {
  ion-list-header {
    padding: 0;
    padding-top: 16px;
  }
  ion-item {
    min-height: 79px;
    --padding-start: 16px;
    --padding-end: 16px;
    margin-top: 10px;
    --inner-padding-end: 0;
    transition: all 0.5s ease;
    ion-label {
      min-height: 26px;
    }
    ion-text {
      font-size: rem-calc(21px);
      font-weight: 500;
      min-height: rem-calc(44px);
    }
  }
  ion-toolbar {
    ion-title {
      font-size: rem-calc(24px);
      text-align: left;
      padding-left: 16px;
    }
    ion-button {
      &.button-disabled {
        background-color: gray;
      }
    }
    --padding-start: 0px;
    --padding-end: 0px;
    --padding-top: 0px;
  }
  .memo-input-item {
    --padding-bottom: 20px;
    ion-text {
      min-height: rem-calc(72px);
    }
    ion-textarea {
      widows: auto;
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
      left: 16px;
      right: 16px;
      bottom: 16px;
    }
    ion-toolbar {
      --border-style: none;
      ion-buttons {
        ion-button {
          font-weight: 500;
          height: rem-calc(42px);
          --padding-start: 16px;
          --padding-end: 16px;
          &.button-disabled {
            --background: gray !important;
          }
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
