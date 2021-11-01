<template>
  <ion-page> </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent, IonFooter } from "@ionic/vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonFooter,
  },
});
</script>
<style lang="scss" scoped>
.login-background {
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
}
.login-background::before {
  content: "";
  width: 100%;
  height: 100%;
  background: url("../../src/assets/img/login/food_background_2x.png");
  background-size: corver;
  background-position: center;
  position: absolute;
  opacity: 0.26;
  top: 0;
  left: 0;
}
.logo-frize-img {
  position: absolute;
  width: 100px;
  top: 50%;
  left: 10%;
  transform: translate(40%, -50%);
}
.logo-text {
  position: absolute;
  width: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-00%, -50%);
}

ion-footer {
  margin: 0;
  padding: 20px;
}
.kakao-login-button {
  width: 100%;

  --background: #fee500;
  --background-activated: #ddc701;
  --color: black;
}
.naver-login-button {
  width: 100%;
  --background: #03c75a;
  --background-activated: #02aa4e;
  --color: white;
}
.naver-login-button-icon {
  background-image: url("../../src/assets/img/login/naver_icon.svg");
  background-repeat: no-repeat;
  background-position: center;
}
.kakao-login-button-icon {
  background-image: url("../../src/assets/img/login/kakao_icon.svg");
  background-repeat: no-repeat;
  background-position: center;
}
.email-login-button {
  width: 100%;
}
</style>
