<template>
  <ion-page>
    <ion-content force-overscroll="false" id="content-login">
      <div id="content" class="login-background">
        <img
          class="logo-img"
          src="../../src/assets/img/logo/logo.svg"
          alt="planeat logo"
        />
      </div>
    </ion-content>
    <ion-footer class="footer-container">
      <ion-button class="button-kakao"
        ><ion-icon
          class="kakao-login-button-icon"
          slot="start"
          name="kakao"
        ></ion-icon
        >카카오 로그인</ion-button
      >
      <ion-button class="button-naver"
        ><ion-icon
          class="naver-login-button-icon"
          slot="start"
          name="naver"
        ></ion-icon>
        네이버 아이디로 로그인</ion-button
      >

      <ion-button
        class="email-login-button"
        color="dark"
        size="small"
        fill="clear"
        ><ion-router-link color="black" href="/register">
          이메일로 로그인 / 회원가입</ion-router-link
        ></ion-button
      >
    </ion-footer>
  </ion-page>
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
.content-login {
  overflow-y: hidden;
}
.login-background {
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.logo-img {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

ion-footer {
  margin: 0;
  padding: 1rem;
}

//카카오 로그인 버튼
.button-kakao {
  width: 100%;
  margin: {
    left: 0;
    right: 0;
    top: 0;
    bottom: 14px;
  }
  --background: #fee500;
  --background-activated: #ddc701;
  --color: black;

  .kakao-login-button-icon {
    background-image: url("../../src/assets/img/login/kakao_icon.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
}

//네이버 아이디로 로그인 버튼
.button-naver {
  width: 100%;
  margin: {
    left: 0;
    right: 0;
    top: 0;
    bottom: 14px;
  }
  --background: #03c75a;
  --background-activated: #02aa4e;
  --color: white;

  .naver-login-button-icon {
    background-image: url("../../src/assets/img/login/naver_icon.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
}

.email-login-button {
  font-weight: 400;
  width: 100%;
  margin: 0px;
}
</style>
