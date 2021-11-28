<template>
  <div class="register-input">
    <div class="register-input-container">
      <ion-text color="black" class="register-title">비밀번호</ion-text>
    </div>
    <ion-item lines="none">
      <app-input
        :propPlaceholder="'비밀번호를 입렵해주세요.'"
        :propAutofocus="true"
        :propValue="inputedPw"
        :propType="pwVisiable1 ? 'text' : 'password'"
        @ionInput="emitPassword($event.target.value)"
        @ionFocus="focus"
      ></app-input>

      <ion-button
        type="button"
        fill="clear"
        @click="managePassword('pwVisiable1')"
      >
        <ion-icon :icon="pwVisiable1 ? eye : eyeOff"></ion-icon>
      </ion-button>
    </ion-item>
    <ion-item lines="none" class="check-input">
      <app-input
        :propPlaceholder="'재입력하세요.'"
        :propValue="inputedPwRe"
        :propType="pwVisiable2 ? 'text' : 'password'"
        @ionInput="emitRePassword($event.target.value)"
      ></app-input>
      <ion-button
        type="button"
        fill="clear"
        @click="managePassword('pwVisiable2')"
      >
        <ion-icon :icon="pwVisiable2 ? eye : eyeOff"></ion-icon>
      </ion-button>
    </ion-item>
    <p color="black" class="sub-lable">{{ subLable }}</p>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import { eye, eyeOff } from "ionicons/icons";
import { IonText, IonIcon, IonItem, IonButton } from "@ionic/vue";
import userAPI from "@/assets/api/userAPI";
import AppInput from "@/components/AppInput.vue";

export default defineComponent({
  emits: ["emitPw"],
  setup(props, { emit }) {
    const subLable = ref(""); // 회원가입 경고 라벨
    const inputedPw = ref(""); // 비밀번호
    const inputedPwRe = ref(""); //비밀번호 재입력
    const pwInputType = ref("password");
    const pwVisiable1 = ref(false);
    const pwVisiable2 = ref(false);

    //비밀번호 보이기/안보이게
    const managePassword = (name: string) => {
      if (name === "pwVisiable1") pwVisiable1.value = !pwVisiable1.value;
      else if (name === "pwVisiable2") pwVisiable2.value = !pwVisiable2.value;
      else return;
    };

    //올바른 비밀번호 형식인지 검사합니다.
    const isPassword = function (password: string) {
      const num = password.search(/[0-9]/g);
      const eng = password.search(/[a-z]/gi);
      const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
      if (password.length < 10 || password.length > 20) {
        subLable.value = "10자리 ~ 20자리 이내로 입력해주세요.";
        return false;
      } else if (password.search(/\s/) != -1) {
        subLable.value = "비밀번호는 공백 없이 입력해주세요.";
        return false;
      } else if (
        (num < 0 && eng < 0) ||
        (eng < 0 && spe < 0) ||
        (spe < 0 && num < 0)
      ) {
        subLable.value =
          "영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.";
        return false;
      } else {
        subLable.value = "";
        return true;
      }
    };

    const emitPassword = (password: string) => {
      inputedPw.value = password;
      if (isPassword(password))
        emit("emitPw", { password: inputedPw.value, isSame: false });
    };

    const emitRePassword = (password: string) => {
      inputedPwRe.value = password;
      let isSame = false;
      if (inputedPw.value === inputedPwRe.value) {
        isSame = true;
        subLable.value = "";
      } else {
        isSame = false;
        subLable.value = "비밀번호가 일치하지 않습니다.";
      }
      emit("emitPw", { password: inputedPw.value, isSame: isSame });
    };
    const focus = () => {
      setTimeout(() => {
        inputedPw.value = "";
        inputedPwRe.value = "";
      }, 200);
      emit("emitPw", { password: "", isSame: false });
    };

    return {
      inputedPwRe,
      isPassword,
      emitPassword,
      emitRePassword,
      subLable,
      pwInputType,
      inputedPw,
      eye,
      eyeOff,
      pwVisiable1,
      pwVisiable2,
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
ion-button {
  position: absolute !important;
  right: 0px;
  z-index: 2;
}
ion-icon {
  color: black !important;
  background-color: transparent;
  font-size: 27px;
  opacity: 0.24;
}
</style>
