<template>
  <div class="register-input">
    <div class="register-input-container">
      <ion-text color="black" class="regiter-title">이메일</ion-text>
    </div>
    <app-input
      :propPlaceholder="'이메일을 입력해주세요.'"
      :propAutofocus="true"
      :propType="'email'"
      @ionInput="emitEmail($event.target.value)"
    ></app-input>
    <p color="black" class="sub-label">{{ propEmailSublabel }}</p>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { IonText } from "@ionic/vue";
import userAPI from "@/assets/api/userAPI";
import AppInput from "@/components/AppInput.vue";

export default defineComponent({
  props: ["propEmailSublabel"],
  emits: ["emitEmail"],
  setup(props, { emit }) {
    const sublabel = ref(""); // 회원가입 경고 라벨
    const inputedEmail = ref(); // 이메일

    const emitEmail = (input: any) => {
      inputedEmail.value = input;
      emit("emitEmail", inputedEmail);
    };

    return {
      emitEmail,
      inputedEmail,
      sublabel,
    };
  },
  components: {
    IonText,
    AppInput,
  },
});
</script>
<style lang="scss" scoped>
</style>
