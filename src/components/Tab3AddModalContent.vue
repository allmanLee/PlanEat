<template>
  <ion-content scroll-y="false">
    <ion-item lines="none">
      <ion-label>재료 이름</ion-label>
      <app-input
        :propType="'text'"
        :propValue="inputedModifyName"
        @ionInput="inputedModifyName = $event.target.value"
      ></app-input>
    </ion-item>
    <ion-item lines="none">
      <ion-label>유통 기한</ion-label>
      <app-input
        :type="'date'"
        :value="inputedModifyExpirationDate"
        @ionInput="inputedModifyExpirationDate = $event.target.value"
      ></app-input>
    </ion-item>
    <ion-button color="medium" expand="block" @click="pushItem()">
      재료 담기
    </ion-button>
    <!-- 내용 확인하기 -->
    <h5>추가될 재료</h5>
    <ion-content>
      <card-button
        :propFrizeId="frizeId"
        :propIngredient="ingredient"
        :propMemoDisabled="false"
        :propAddMode="true"
        @emitDelete="emitedDelete"
        v-for="(ingredient, index) of selectedItems"
        :key="index"
      >
      </card-button>
    </ion-content>
  </ion-content>
  <ion-footer mode="ios">
    <ion-button expand="full" @click="addItems">추가하기</ion-button>
  </ion-footer>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { VueEvent } from "@/types/event.js";
import { useStore } from "@/store/index";
import {
  IonContent,
  IonButton,
  IonFooter,
  IonLabel,
  IonItem,
} from "@ionic/vue";
import { FrigeType, IngredientType } from "@/types/frige";
import AppInput from "./AppInput.vue";
import CardButton from "./cardButton.vue";
import { FrizeIngreModify } from "@/types/request-types/frize-request-types";

export default defineComponent({
  components: {
    IonContent,
    IonButton,
    IonFooter,
    IonItem,
    IonLabel,
    AppInput,
    CardButton,
  },
  emits: ["emitAddItem"],
  setup(prop, { emit }) {
    const store = useStore();
    const selectedItems = ref<FrigeType[]>([]);

    //냉장고 아이디
    const frizeId = computed(() => store.state.frige.selectedCateId);

    //입력받은 값
    const inputedModifyName = ref<string>("");
    const inputedModifyUpdatedDate = ref<string>("");
    const inputedModifyExpirationDate = ref<string>("");

    //초기 날짜 설정
    const ingreDateInit = () => {
      const date = new Date();
      const dateEx = new Date();
      const fillZero = (number: number) => {
        const toString = String(number);
        if (String(number).length !== 2) return String(0) + toString;
        else return toString;
      };
      const formatDate = (date: Date) =>
        `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(
          date.getDate()
        )}`;
      inputedModifyUpdatedDate.value = formatDate(date);
      dateEx.setDate(dateEx.getDate() + 10);
      console.log(formatDate(dateEx));
      inputedModifyExpirationDate.value = formatDate(dateEx);
    };

    //초기 날짜 설정
    ingreDateInit();

    //아이템 넣기
    const pushItem = () => {
      const nameLengthCheck = (name: string) => {
        if (name.length >= 1) {
          return true;
        } else {
          alert("재료명을 1자 이상 입력해주세요.");
          return false;
        }
      };
      const resultData: FrigeType = {
        name: inputedModifyName.value,
        updatedDate: inputedModifyUpdatedDate.value,
        expirationDate: inputedModifyExpirationDate.value,
        id:
          inputedModifyName.value +
          inputedModifyUpdatedDate.value.replaceAll("-", ""),
      };
      const hasName = selectedItems.value.filter(
        (el) => el.name === inputedModifyName.value
      );
      if (nameLengthCheck(inputedModifyName.value)) {
        if (selectedItems.value !== undefined)
          if (hasName.length === 0) selectedItems.value.push(resultData);
          else alert("이미 재료를 추가했습니다. 재료이름을 바꿔입력하세요.");
      }
    };
    //추가하기
    const addItems = () => {
      const reqData: FrizeIngreModify = {
        frizeId: frizeId.value,
        ingredientAdd: selectedItems.value,
      };
      emit("emitAddItem");
      store.dispatch("frige/frizeIngredient", reqData);
    };
    //삭제
    const emitedDelete = (id: string) => {
      selectedItems.value = selectedItems.value.filter((el) => el.id !== id);
    };

    return {
      inputedModifyName,
      inputedModifyUpdatedDate,
      inputedModifyExpirationDate,
      pushItem,
      emitedDelete,
      selectedItems,
      addItems,
    };
  },
});
</script>
<style lang="scss" scoped>
ion-content {
  --padding-start: 16px;
  --padding-end: 16px;
  h5 {
    margin-top: 40px;
    margin-bottom: 0px;
  }
  ion-item {
    --padding-top: 4px;
    --padding-bottom: 4px;
    ion-label {
      font-weight: 600;
      font-size: rem-calc(16px);
    }
    ion-label {
      font-weight: 600;
      min-width: 80px;
      font-size: rem-calc(16px);
    }
  }
  ion-button {
    margin-top: 12px;
  }

  ion-content {
    --padding-start: 0px;
    --padding-end: 0px;
    ion-item {
      height: 100%;
      --inner-padding-start: 0;
      --padding-start: 0;
      --inner-padding-end: 0;
      --padding-end: 0;
    }
  }
}

ion-footer {
  background: white;
  box-shadow: 0x -3px 6px rgba(0, 0, 0, 0.16%) !important;
  position: fixed;
  width: 100%;
  bottom: 0px;
}
</style>