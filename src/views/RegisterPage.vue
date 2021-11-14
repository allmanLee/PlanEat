<template>
  <ion-page>
    <app-header headerTitle="회원가입"></app-header>
    <ion-content scrollY="false">
      <div class="email-input">
        <div class="email-input-container">
          <ion-text color="black" class="email-title">이메일</ion-text>
        </div>
        <app-input
          :propPlaceholder="'이메일을 입력해주세요.'"
          :propAutofocus="true"
          @ionInput="emailChecker($event)"
        ></app-input>
        <p color="black" class="sub-lable">{{ subLable }}</p>
      </div>
      <ion-button
        class="button-email-authentication"
        expand="block"
        :disabled="true"
        >이메일 인증</ion-button
      >
      <ion-button class="button-continue" expand="block" :disabled="true">
        계속하기</ion-button
      >
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { IonPage, IonText, IonContent } from "@ionic/vue";
import userAPI from "@/assets/api/userAPI"
import AppHeader from "@/components/AppHeader.vue";
import AppInput from "@/components/AppInput.vue";

export default defineComponent({
  setup() {
    const subLable = ref("");
    //이메일이 중복되었는지 서버에서 검사합니다.
    const checkDuplicateEmail = (email: string) => {
      
      return function() ? true : false;
    };

    //올바른 이메일의 형식인지 검사합니다.
    const isEmail = (email: string) => {
      const pattern =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        userAPI.CheckDuplicateEmail()
      return pattern.test(email) ? true : false;
    };

    //조건이 통과되었을때 '다음으로 이동 가능' 버튼 활성화
    return {
      subLable,
      isEmail,
      checkDuplicateEmail,
    };
  },
  methods: {},
  components: {
    IonPage,
    AppHeader,
    IonText,
    IonContent,
    AppInput,
  },
});
</script>
<style lang="scss" scoped>
.email-input-container {
  .email-title {
    color: var(--custom-gray-02);
  }
  margin: {
    top: rem-calc(40px);
    bottom: rem-calc(10px);
  }
  font: {
    size: rem-calc(21px);
    weight: bold;
  }
}
.email-input {
  margin: {
    bottom: rem-calc(60px) !important;
  }
}
.sub-lable {
  position: absolute;
  margin: {
    top: rem-calc(6px);
  }
  color: var(--ion-color-danger);
}

ion-button {
  width: 100%;
  margin-bottom: 14px;

  &[disabled] {
    --background: var(--custom-gray-04);
  }
}

.button-email-authentication {
  --background: var(--custom-gray-01);
}
</style>
