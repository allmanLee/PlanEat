<template>
  <div class="register-input">
    <div class="register-input-container">
      <ion-text color="dark" class="register-title">이메일 인증</ion-text>
    </div>
    <ion-button
      @click="test"
      fill="clear"
      expand="full"
      color="dark"
      :disabled="AthReBtndisabled"
      class="auth-re-button"
      >재요청</ion-button
    >
    <ion-item lines="none">
      <app-input
        :propAutofocus="true"
        :propValue="propEmail"
        :propType="'text'"
        @ionFocus="focus"
        disabled
      ></app-input>
    </ion-item>
    <ion-item lines="none" class="check-input">
      <app-input
        :propPlaceholder="'인증번호'"
        :propValue="inputedAuth"
        :propType="authVisiable ? 'text' : 'password'"
        @ionInput="emitAuth($event.target.value)"
      ></app-input>
      <ion-button type="button" fill="clear" @click="managePassword()">
        <ion-icon :icon="authVisiable ? eye : eyeOff"></ion-icon>
      </ion-button>
    </ion-item>
    <p class="sub-label">{{ propAuthSublabel }}</p>
    <ion-label class="countdown-label"
      ><p>{{ count }}초 남음</p></ion-label
    >
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import { eye, eyeOff } from "ionicons/icons";
import { IonText, IonIcon, IonItem, IonButton, IonLabel } from "@ionic/vue";
import userAPI from "@/assets/api/userAPI";
import AppInput from "@/components/AppInput.vue";

export default defineComponent({
  props: { propEmail: String, propAuthSublabel: String },
  emits: ["emitAuth"],
  setup(props, { emit }) {
    const sublabel = ref(""); // 회원가입 경고 라벨
    const inputedAuth = ref(""); // 비밀번호
    const authInputType = ref("password");
    const authVisiable = ref(false);

    //20초(인증번호 재요청 카운트)
    const count = ref(120);
    const countdown = function () {
      count.value = 120;
      const interval = setInterval(() => {
        if (count.value > 0) {
          count.value--;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    };
    countdown();

    //비밀번호 보이기/안보이게
    const managePassword = () => {
      authVisiable.value = !authVisiable.value;
    };

    const emitAuth = (authKey: string) => {
      inputedAuth.value = authKey;
      emit("emitAuth", authKey);
    };
    const AthReBtndisabled = ref(false);
    const test = () => {
      if (props.propEmail)
        userAPI.SendAuthEmail({ email: props.propEmail }).then(() => {
          alert("해당 이메일로 인증코드가 전송되었습니다.");
        });
      AthReBtndisabled.value = true;
      countdown();
      setTimeout(() => {
        //20초 후에 다시 인증코드 전송 가능
        AthReBtndisabled.value = false;
      }, 20000);
    };

    return {
      sublabel,
      authInputType,
      inputedAuth,
      eye,
      authVisiable,
      AthReBtndisabled,
      eyeOff,
      test,
      emitAuth,
      managePassword,
      focus,
      count,
    };
  },
  components: {
    IonText,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
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

.auth-re-button {
  right: rem-calc(12px);
}
.countdown-label {
  margin: rem-calc(2px);
  text-align: right;
}
</style>
