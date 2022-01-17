<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="fishOutline"></ion-icon>
          <ion-label>냉장고</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="notificationsOutline" />
          <ion-label>알림</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="settingsOutline" />
          <ion-label>MY/설정</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { useStore } from "@/store/index";
import {
  homeOutline,
  notificationsOutline,
  fishOutline,
  settingsOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "Tabs",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      homeOutline,
      notificationsOutline,
      fishOutline,
      settingsOutline,
    };
  },
});
</script>
<style lang="scss"  scoped>
ion-tab-bar {
  height: 56px;
  border: none;
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.07);
}
</style>
