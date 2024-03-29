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
              v-if="expirationDateTag <= 7"
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
    <transition name="fade" mode="in-out">
      <ion-card-content v-if="propMemoDisabled">
        {{ ingredient.memo ? ingredient.memo : "메모가 필요하실가요?" }}
      </ion-card-content>
    </transition>
  </ion-card>

  <!-- 재료 수정부 팝업 -->
  <app-popover
    :propOpenPopover="closePopover"
    @closePopover="(closePopover = false), ingreModify(false)"
  >
    <ion-list v-if="!propAddMode" class="modify-popup">
      <ion-list-header>
        <ion-toolbar>
          <ion-title mode="ios"
            >{{ ingredient.name
            }}<span v-if="expirationDateTag <= 7" class="badge-container"
              ><ion-badge :color="expirationDateTagColor">{{
                expirationDateTagName
              }}</ion-badge></span
            >
          </ion-title>
        </ion-toolbar>
      </ion-list-header>
      <ion-item lines="none">
        <ion-label position="stacked">보관날짜</ion-label>
        <transition name="fade" mode="out-in">
          <ion-text v-if="modifyMode">{{ koreanUpdatedDate }}</ion-text>
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
        <ion-label position="stacked">유통기한</ion-label>
        <transition name="fade" mode="out-in">
          <ion-text v-if="modifyMode">{{ koreanExpirationDate }}</ion-text>
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
            <transition name="fade" mode="out-in">
              <ion-button
                color="light"
                fill="solid"
                @click="ingreModify(true)"
                :key="modifyMode"
                >{{ modifyMode ? "수정하기" : "원래대로" }}</ion-button
              >
            </transition>
            <transition name="fade" mode="out-in">
              <ion-button
                v-if="!modifyMode"
                expand="block"
                fill="solid"
                :disabled="modifyMode"
                @click="Modifyingredient()"
              >
                편집완료
              </ion-button>
              <ion-button
                v-else
                slot="start"
                color="danger"
                fill="solid"
                @click="deleteIngredient()"
              >
                삭제하기
              </ion-button>
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
    IonCardContent,
    IonList,
    IonListHeader,
    IonTitle,
    IonItem,
    IonLabel,
    IonToolbar,
    IonFooter,
    IonButton,
    IonText,
    IonTextarea,
    AppInput,
    IonButtons,
    IonBadge,
    AppPopover,
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

    const changeKoreanDate = (date: string) => {
      if (!date) return;
      return date
        .split("-")
        .map((el, index) => {
          if (index === 0) return el + "년";
          else if (index === 1) return el + "월";
          else return el + "일";
        })
        .join(" ");
    };

    const koreanExpirationDate = computed(() => {
      const expirationDate = props.propIngredient.expirationDate;
      if (!expirationDate) return;
      return changeKoreanDate(expirationDate);
    });

    const koreanUpdatedDate = computed(() => {
      const updatedDate = props.propIngredient.updatedDate;
      if (!updatedDate) return;
      return changeKoreanDate(updatedDate);
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
      const dateDifference =
        (exDate.getTime() - upDate.getTime()) / (1000 * 60 * 60 * 24);

      return dateDifference;
    });

    const expirationDateTagName = computed(() => {
      const tagValue = expirationDateTag.value;
      if (tagValue < 0) return "지남";
      else if (tagValue === 0) return "오늘";
      else if (tagValue <= 7) return `${tagValue}일 남음`;
      else return "보통";
    });
    const expirationDateTagColor = computed(() => {
      const tagValue = expirationDateTag.value;
      if (tagValue < 0) return "medium";
      else if (tagValue === 0) return "danger";
      else if (tagValue <= 7) return "warning";
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
          modifyMode.value = !modifyMode.value;
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
      koreanUpdatedDate,
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
  box-shadow: 0px 2px 6px rgba(116, 69, 0, 0.1);
  border-radius: 16px;
  width: 100%;
  height: auto;
  margin-bottom: 8px;
  margin-top: 4px;
  margin-left: 0;
  margin-right: 0;
  padding: 16px;
  margin-right: 4px;
  margin-left: 4px;
  transition: all 0.5s ease;
  ion-card-header {
    padding: 0px;
    ion-card-title {
      font-size: 16px;
      font-weight: 500;
      padding: 0px;
    }
  }
  ion-card-content {
    border-radius: 10px;
    background: var(--custom-gray-05);
    margin-top: 8px;
    padding: 8px;
  }
}

.badge-container {
  height: 100%;
  line-height: 100%;
  padding-top: 2px;
  vertical-align: middle;
  padding-left: 8px;
}
ion-badge {
  --color: white !important;
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
  // height: 500px;
  ion-list-header {
    padding: 0;
    padding-top: 16px;
  }
  ion-item {
    min-height: 86px;
    --padding-start: 16px;
    --padding-end: 16px;
    margin-top: 10px;
    --inner-padding-end: 0;
    transition: all 0.5s ease;
    ion-label {
      font-weight: 500;
      font-size: rem-calc(16px);
      color: var(--ion-color-primary-shade);
      min-height: 26px;
    }
    ion-text {
      font-size: rem-calc(16px);
      min-height: rem-calc(44px);
    }
    transition: all 2s ease;
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
    min-height: 136px;
    --padding-bottom: 20px;
    .memo-input-item {
      height: rem-calc(72px);
    }
    ion-text {
      min-height: rem-calc(72px);
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
          margin-left: 14px;
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
  transition: all 2s ease;
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
