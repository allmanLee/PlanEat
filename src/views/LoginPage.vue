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
      <ion-button mode="ios" class="button-kakao" @click="onClickLogin()"
        ><ion-icon
          class="kakao-login-button-icon"
          slot="start"
          name="kakao"
        ></ion-icon
        >카카오 로그인</ion-button
      >
      <ion-button mode="ios" class="button-naver"
        ><ion-icon
          class="naver-login-button-icon"
          slot="start"
          name="naver"
        ></ion-icon>
        네이버 아이디로 로그인</ion-button
      >

      <ion-button
        mode="ios"
        class="email-login-button"
        color="dark"
        size="small"
        fill="clear"
        ><router-link color="black" to="/register">
          이메일로 로그인 / 회원가입</router-link
        ></ion-button
      >
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent, IonFooter, IonIcon, IonButton } from "@ionic/vue";
import { useKakao } from "vue3-kakao-sdk";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";
import snsAPI from "@/assets/api/snsAPI";
import { AuthSNSOption } from "@/types/request-types/auth-request-types";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { kakao } = useKakao();
    const store = useStore();
    //카카오 회원정보 불러오기(DB에 저장합니다.)
    const getKakaouUserInfo = async () => {
      kakao.value.API.request({
        url: "/v2/user/me",
        success: function (res) {
          const reqData: AuthSNSOption = {
            email: res.kakao_account.email,
            snsType: "kakao",
          };
          snsAPI.ControllerSNS(reqData).then((res) => {
            localStorage.setItem("act", res.data.dataObj.acToken);
            localStorage.setItem("ref", res.data.dataObj.refToken);
            if (res.data.dataObj.method === "register")
              store.dispatch("frige/frizeAdd", {
                email: reqData.email,
                frizeName: "냉장고",
              });
            router.push("/tabs");
          });
        },
        fail: function (err) {
          alert(
            "login success, but failed to request user information: " +
              JSON.stringify(err)
          );
        },
      });
    };

    //카카오 로그인
    const onClickLogin = async () => {
      // console.log("카카오 로그인")
      await kakao.value.Auth.login({
        async success(resData) {
          const acToken = resData.access_token;
          const refToken = resData.refresh_token;
          kakao.value.Auth.setAccessToken(acToken);
          localStorage.setItem("kakao_ac", acToken);
          localStorage.setItem("kakao_ref", refToken);

          await getKakaouUserInfo();
        },
        fail(err) {
          alert(err);
        },
      });
    };

    return { onClickLogin };
  },
  components: {
    IonPage,
    IonContent,
    IonFooter,
    IonIcon,
    IonButton,
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
