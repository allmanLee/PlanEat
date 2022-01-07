import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from './store';
import { IonicVue } from "@ionic/vue";
import { createVueKakaoSdk, Kakao } from 'vue3-kakao-sdk';

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

import "@/theme/variables.css";
import "@/assets/css/globle.scss";
import "@/assets/css/custom.scss";
import "@/assets/css/base.scss";
import config from "@/config.env";
import { Capacitor3KakaoLogin } from 'capacitor3-kakao-login';
import { SplashScreen } from '@capacitor/splash-screen';
// eslint-disable-next-line @typescript-eslint/camelcase
Capacitor3KakaoLogin.initializeKakao(config.kakao);

const app = createApp(App).use(store, key).use(IonicVue).use(router).use(createVueKakaoSdk('a4c31b869ad4d106aac99ef115f4be70'));

router.isReady().then(() => {
  SplashScreen.hide();
  app.mount("#app");
});