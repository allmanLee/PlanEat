<template>
  <ion-content mode="ios">
    <ion-card mode="ios">
      <ion-card-header mode="ios">
        <ion-card-title mode="ios">회원 탈퇴하시겠습니까?</ion-card-title>
      </ion-card-header>
      <ion-card-content
        >회원 탈퇴 시 기존에 등록했던 냉장고 및 재료, 레시피의 내용이 모두
        삭제되며, 이후에도 또한 복구 할 수 없습니다. <br /><br />정말 '냉장고
        파먹는 레시피'를<br />
        탈퇴하시겠습니까?
      </ion-card-content>
      <ion-footer mode="ios">
        <ion-button expand="block" fill="outline" @click="delteMeber()"
          >예, 탈퇴합니다</ion-button
        >
      </ion-footer>
    </ion-card>
  </ion-content>
  <ion-footer mode="ios">
    <ion-button expand="block" fill="solid" @click="close()"
      >돌아가기</ion-button
    >
  </ion-footer>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFooter,
  IonButton,
} from "@ionic/vue";
import userAPI from "@/assets/api/userAPI";
export default defineComponent({
  emits: ["emitCloseModal"],
  setup(prop, { emit }) {
    const close = () => emit("emitCloseModal");
    const delteMeber = () => userAPI.DeleteMember();
    return {
      close,
      delteMeber,
    };
  },
  components: {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonFooter,
    IonButton,
  },
});
</script>
<style lang="scss" scoped>
ion-content {
  ion-card {
    box-shadow: none;
    text-align: center;
    ion-card-header {
      ion-card-title {
        font-size: rem-calc(26px);
      }
    }
    ion-footer {
      ion-button {
        margin: 16px;
      }
    }
  }
}
ion-footer {
  ion-button {
    margin: 16px;
  }
}
</style>
