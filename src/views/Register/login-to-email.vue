<template>
  <div class="register-input">
    <div class="register-input-container">
      <ion-text color="dark" class="register-title">이메일로 로그인</ion-text>
    </div>
    <ion-item lines="none">
      <app-input
        :propAutofocus="true"
        :propPlaceholder="'이메일'"
        :propValue="loginEmail"
        :propType="'text'"
        @ionInput="loginEmail = $event.target.value"
        @ionFocus="focus"
      ></app-input>
    </ion-item>
    <ion-item lines="none" class="check-input">
      <app-input
        :propPlaceholder="'비밀번호'"
        :propValue="loginPassword"
        :propType="pwVisiable ? 'text' : 'password'"
        @ionInput="loginPassword = $event.target.value"
      ></app-input>
      <ion-button
        class="eye-button"
        type="button"
        fill="clear"
        @click="managePassword()"
      >
        <ion-icon :icon="pwVisiable ? eye : eyeOff"></ion-icon>
      </ion-button>
    </ion-item>

    <ion-button expand="block" class="login-button" @click="login"
      >로그인</ion-button
    >
    <ion-button
      expand="block"
      fill="clear"
      color="dark"
      class="register-authentication"
      @click="emitPage"
      >회원가입</ion-button
    >
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import { eye, eyeOff } from "ionicons/icons";
import { IonText, IonIcon, IonItem, IonButton } from "@ionic/vue";
import userAPI from "@/assets/api/userAPI";
import AppInput from "@/components/AppInput.vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  emits: ["emitPage"],
  setup(props, { emit }) {
    const subLable = ref(""); // 회원가입 경고 라벨
    const loginEmail = ref(""); //이메일
    const loginPassword = ref(""); // 비밀번호
    const pwInputType = ref("password");
    const pwVisiable = ref(false);

    //비밀번호 보이기/안보이게
    const managePassword = () => {
      pwVisiable.value = !pwVisiable.value;
    };
    //로그인
    const router = useRouter();
    const login = () => {
      userAPI
        .LoginToEmail({
          email: loginEmail.value,
          password: loginPassword.value,
        })
        .then((res) => {
          localStorage.setItem("act", res.data.returnObj.token);
          localStorage.setItem("reft", res.data.returnObj.ref_token);
          localStorage.setItem("email", loginEmail.value);
          router.push({
            path: "/tabs/",
          });
        })
        .catch(() => {
          alert("아이디 또는 비밀번호가 틀렸습니다.");
        });
    };
    const AthReBtndisabled = ref(false);
    const emitPage = () => {
      emit("emitPage");
    };
    return {
      subLable,
      loginEmail,
      loginPassword,
      pwInputType,
      login,
      eye,
      emitPage,
      pwVisiable,
      AthReBtndisabled,
      eyeOff,
      managePassword,
      focus,
    };
  },
  components: {
    IonText,
    IonButton,
    IonIcon,
    IonItem,
    AppInput,
  },
});
</script>
<style lang="scss" scoped>
ion-item {
  width: 100% !important;
}
ion-item {
  --padding-start: 0;
  --inner-padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
}

ion-icon {
  color: black !important;
  background-color: transparent;
  font-size: 27px;
  opacity: 0.24;
}
.register-authentication {
  margin-top: 12px !important;
  font-weight: 400;
}
.eye-button {
  position: absolute !important;
  right: 0px;
  z-index: 2;
}

.login-button {
  margin-top: 20px;
}
</style>
