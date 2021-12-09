<template>
  <ion-page>
    <app-header
      :headerTitle="pageCnt === 0 ? '로그인' : '회원가입'"
    ></app-header>
    <ion-content scrollY="false">
      <login-to-email v-if="pageCnt === 0" @emitPage="pageCnt++">
      </login-to-email>
      <register-input-email
        v-if="pageCnt === 1"
        :propEmailSubLable="EmailSubLable"
        @emitEmail="emitedEmail"
      ></register-input-email>
      <register-input-pw
        v-if="pageCnt === 2"
        @emitPw="emitedPw"
      ></register-input-pw>
      <register-input-auth
        v-if="pageCnt === 3"
        :propEmail="email"
        :propAuthSubLable="authSubLable"
        @emitAuth="emitedAuth"
      ></register-input-auth>
      <div v-if="pageCnt !== 0">
        <ion-button
          class="button-email-authentication"
          expand="block"
          :disabled="activeAthBtn ? false : true"
          @click="clickAthBtn"
          >이메일 인증</ion-button
        >
        <ion-button
          class="button-continue"
          expand="block"
          :disabled="activeCnBtn ? false : true"
          @click="clickCnBtn"
        >
          계속하기</ion-button
        >
      </div>
    </ion-content>
    <teleport to="body">
      <app-popover :propOpenPopover="popDisabled">
        <div>
          <p class="register-auth-popover-title">이메일 인증필요</p>
          <p class="register-auth-popover">
            본인 확인을 위해 이메일 <br />인증을 완료해주세요
          </p>
          <ion-button expand="full" @click="popoverOff" :disabled="spinnerShow">
            <span v-if="!spinnerShow">확인</span
            ><ion-spinner v-if="spinnerShow" name="circles"></ion-spinner>
          </ion-button>
        </div>
      </app-popover>
    </teleport>
  </ion-page>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { IonPage } from "@ionic/vue";
import LoginToEmail from "@/views/Register/login-to-email.vue";
import RegisterInputEmail from "@/views/Register/register-input-email.vue";
import RegisterInputPw from "@/views/Register/register-input-pw.vue";
import RegisterInputAuth from "@/views/Register/register-input-auth.vue";
// import RegisterInputEmail from "@/views/Register/register-input-email.vue";
import userAPI from "@/assets/api/userAPI";
import AppHeader from "@/components/AppHeader.vue";
import AppPopover from "@/components/AppPopover.vue";
import { useStore } from "@/store/index";
import router from "@/router";
export default defineComponent({
  setup(props) {
    //이메일이 중복되었는지 서버에서 확인합니다.
    const store = useStore();
    const email = ref(""); //이메일
    const password = ref(""); //비밀번호
    const auth = ref("");
    const activeAthBtn = ref(false);
    const activeCnBtn = ref(false); //버튼 활성화 여부
    const pageCnt = ref(0); //[이메일입력(0)-> 비밀번호 입력(1) -> 이메일 인증(2) -> 홈으로(3)]
    //올바른 이메일의 형식인지 검사합니다.
    const isEmail = (email: string) => {
      const EMAIL_PATTERN =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 패턴
      const test = EMAIL_PATTERN.test(email);
      activeCnBtn.value = test; //사이드 이팩트  (어떻게 하면 없앨 수 있을까)
      return test ? true : false;
    };

    //emit Email
    const emitedEmail = (val: any) => {
      email.value = val.value;
      isEmail(val.value);
    };

    //emit Password
    const emitedPw = (val: any) => {
      password.value = val.password;
      if (val.isSame && password.value) {
        activeCnBtn.value = true;
      } else activeCnBtn.value = false;
    };

    //emit Auth
    const emitedAuth = (val: any) => {
      const AUTH_PATTERN = /^[a-z0-9A-Z]{8,10}/;
      auth.value = val;
      if (AUTH_PATTERN.test(val)) {
        activeAthBtn.value = true;
      } else activeAthBtn.value = false;
    };
    const EmailSubLable = ref("");
    const authSubLable = ref("");
    //계속하기
    const popDisabled = ref(false);
    const clickCnBtn = () => {
      if (pageCnt.value === 1)
        userAPI
          .CheckDuplicateEmail({ email: email.value })
          .then((data) => {
            activeCnBtn.value = false;
            pageCnt.value++;
            return data;
          })
          .catch((err) => {
            EmailSubLable.value = "이미 존재하는 이메일입니다.";
          });
      if (pageCnt.value === 2) {
        userAPI
          .RegisterToEmail({ email: email.value, password: password.value })
          .then(() => {
            pageCnt.value++;
            activeCnBtn.value = false;
            popDisabled.value = true;
            store.dispatch("frige/frizeAdd", {
              email: email.value,
              frizeName: "냉장고",
            });
          });
      }
      if (pageCnt.value === 3) {
        //로그인부분
        userAPI
          .LoginToEmail({
            email: email.value,
            password: password.value,
          })
          .then((res) => {
            localStorage.setItem("act", res.data.returnObj.token);
            localStorage.setItem("reft", res.data.returnObj.ref_token);
            localStorage.setItem("email", email.value);
            router.push({
              path: "/tabs/",
            });
          });
      }
    };

    //인증하기
    const clickAthBtn = () => {
      userAPI
        .CheckAuthKey({ key: auth.value, email: email.value })
        .then(() => {
          activeCnBtn.value = true;
          activeAthBtn.value = false;
        })
        .catch(() => {
          authSubLable.value = "인증코드가 올바르지 않습니다.";
        });
    };
    const spinnerShow = ref(false);
    //popover disable
    const popoverOff = () => {
      spinnerShow.value = true;
      userAPI.SendAuthEmail({ email: email.value }).then(() => {
        popDisabled.value = false;
        spinnerShow.value = false;
        alert("해당 이메일로 인증코드가 전송되었습니다.");
      });
    };

    return {
      EmailSubLable,
      emitedEmail,
      emitedAuth,
      spinnerShow,
      clickAthBtn,
      authSubLable,
      email,
      emitedPw,
      auth,
      password,
      pageCnt,
      isEmail,
      activeAthBtn,
      activeCnBtn,
      clickCnBtn,
      popDisabled,
      popoverOff,
    };
  },
  components: {
    IonPage,
    LoginToEmail,
    AppHeader,
    AppPopover,
    RegisterInputPw,
    RegisterInputEmail,
    RegisterInputAuth,
  },
});
</script>
<style lang="scss" scoped>
ion-button {
  width: 100%;
  margin-bottom: 14px;
  &[disabled] {
    --background: var(--custom-gray-04);
  }
}

.button-email-authentication {
  --background: var(--custom-gray-01);
  --background-activated: black !important;

  --background-hover: black !important;
}
.register-auth-popover-title {
  font: {
    size: rem-calc(21px);
    weight: bold;
  }
  text-align: center;
}
.register-auth-popover {
  font: {
    size: rem-calc(16px);
    weight: reguler;
  }
  text-align: center;
}
</style>
