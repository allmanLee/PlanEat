<template>
  <ion-content scroll-y="false">
    <ion-list>
      <ion-list-header>유통기한</ion-list-header>
      <app-input
        :type="'date'"
        id="dateInput"
        :value="inputedModifyExpirationDate"
        @ionInput="inputedModifyExpirationDate = $event.target.value"
      ></app-input>
    </ion-list>
    <ion-list>
      <ion-list-header>재료 이름</ion-list-header>
      <app-input
        :propType="'text'"
        id="nameInput"
        :propValue="inputedModifyName"
        @ionInput="inputedModifyName = $event.target.value"
        @ionFocus="activeInputFocused()"
        @ionBlur="unActiveInputFocused()"
      ></app-input>
    </ion-list>

    <!-- <ion-list class="button-container">
      <ion-button @click="pushItem()"> 재료 담기 </ion-button>
    </ion-list> -->
    <ion-list>
      <hr />
      <h5>추가될 재료</h5>
    </ion-list>
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
    <transition name="fade" mode="out-in">
      <ion-button
        :expand="isFocused ? 'full' : 'block'"
        :class="isFocused ? '' : 'save-button'"
        v-bind:key="isFocused"
        :color="isFocused ? 'tertiary' : 'primary'"
        @click="isFocused ? pushItem() : addItems()"
        >{{ buttonMessage }}</ion-button
      >
    </transition>
  </ion-footer>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store/index";
import {
  IonContent,
  IonButton,
  IonFooter,
  IonList,
  IonListHeader,
} from "@ionic/vue";
import { FrigeType } from "@/types/frige";
import AppInput from "./AppInput.vue";
import CardButton from "./cardButton.vue";
import { FrizeIngreModify } from "@/types/request-types/frize-request-types";

export default defineComponent({
  components: {
    IonContent,
    IonButton,
    IonFooter,
    IonList,
    IonListHeader,
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
      inputedModifyExpirationDate.value = formatDate(dateEx);
    };

    const isFocused = ref(false);
    //재료 추가(버튼 트렌지션)
    const buttonMessage = computed(() => {
      switch (isFocused.value) {
        case false:
          return "추가 완료";
        case true:
          return `${inputedModifyName.value} 추가`;
      }
      return undefined;
    });
    const activeInputFocused = () => {
      isFocused.value = true;
    };
    const unActiveInputFocused = () => {
      setTimeout(() => {
        isFocused.value = false;
      }, 200);
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
          if (hasName.length === 0) {
            inputedModifyName.value = "";
            selectedItems.value.push(resultData);
          } else alert("이미 재료를 추가했습니다. 재료이름을 바꿔입력하세요.");
      }
    };
    //추가하기
    const addItems = () => {
      if (selectedItems.value.length === 0) return emit("emitAddItem");
      const reqData: FrizeIngreModify = {
        frizeId: frizeId.value,
        ingredientAdd: selectedItems.value,
      };
      emit("emitAddItem");
      inputedModifyName.value = "";
      store
        .dispatch("frige/frizeIngredient", reqData)
        .then(() => (selectedItems.value = []));
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
      frizeId,
      emitedDelete,
      selectedItems,
      isFocused,
      addItems,
      activeInputFocused,
      unActiveInputFocused,
      buttonMessage,
    };
  },
});
</script>
<style lang="scss" scoped>
ion-content {
  --padding-start: 16px;
  --padding-end: 16px;
  ion-list {
    hr {
      background-color: var(--custom-gray-04);
      width: 100%;
      height: 1px;
    }
    ion-list-header {
      padding-left: 0px;
      padding-bottom: 10px;
      font-size: rem-calc(16px);
    }
  }
  ion-list.button-container {
    text-align: center;
    ion-button {
      --background: var(--custom-gray-02);
      --background-activated: var(--custom-gray-01);
      --padding-start: 32px;
      --padding-end: 32px;
      --box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.24) !important;
      margin-top: 26px;
      margin-bottom: 26px;
    }
  }
  h5 {
    margin-top: 12px;
    margin-bottom: 0px;
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
  ion-button {
    min-height: rem-calc(48px);
    bottom: 0px;
  }
  ion-button.save-button {
    margin: 16px !important;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>