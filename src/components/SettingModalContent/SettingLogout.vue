<template>
  <ion-card-title mode="ios">정말 로그아웃 하시겠습니까?</ion-card-title>
  <ion-card-content>
    <ion-toolbar>
      <ion-buttons slot="end">
        <ion-button fill="outline" @click="closePopover">나가기</ion-button>
        <ion-button fill="solid" @click="logout">로그아웃</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-card-content>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCardTitle,
  IonCardContent,
  IonToolbar,
  IonButton,
  IonButtons,
} from "@ionic/vue";
import userAPI from "@/assets/api/userAPI";
export default defineComponent({
  emits: ["emitClosePopover"],
  setup(props, { emit }) {
    const logout = () => userAPI.Logout();
    const closePopover = () => {
      emit("emitClosePopover");
    };
    return { closePopover, logout };
  },
  components: {
    IonCardTitle,
    IonCardContent,
    IonToolbar,
    IonButton,
    IonButtons,
  },
});
</script>
<style lang="scss" scoped>
ion-card-title {
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: rem-calc(16px);
  font-weight: 400;
}
ion-card-content {
  padding-right: 16px;
  padding-bottom: 16px;
  ion-toolbar {
    --padding-top: 0px;
    --padding-bottom: 0px;
    --padding-start: 0px;
    --padding-end: 0px;
    ion-buttons {
      ion-button {
        min-height: rem-calc(40px);
        margin-left: 14px;
        margin-right: 0px;
        --padding-start: 16px;
        --padding-end: 16px;
      }
    }
  }
}
</style>
