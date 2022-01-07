<template>
  <div>
    <ion-card mode="ios">
      <ion-list-header mode="ios">기능 설정</ion-list-header>
      <ion-list>
        <ion-item
          lines="full"
          v-for="(item, index) of cardItems01"
          button
          @click="item.method()"
          :key="index"
        >
          {{ item.title }}
        </ion-item>
      </ion-list>
    </ion-card>

    <ion-card mode="ios">
      <ion-list-header mode="ios">앱 설정</ion-list-header>
      <ion-list>
        <ion-item
          lines="full"
          v-for="(item, index) of cardItems02"
          button
          @click="item.method()"
          :key="index"
        >
          {{ item.title }}
        </ion-item>
      </ion-list>
    </ion-card>

    <ion-card mode="ios">
      <ion-list-header mode="ios">계정 설정</ion-list-header>
      <ion-list>
        <ion-item
          lines="full"
          v-for="(item, index) of cardItems03"
          button
          :color="index === 1 ? 'light' : 'none'"
          @click="item.method()"
          :key="index"
        >
          {{ item.title }}
        </ion-item>
      </ion-list>
    </ion-card>
  </div>
  <teleport to="body">
    <ion-modal
      :is-open="isOpenRef"
      css-class="my-custom-class"
      :swipe-to-close="true"
      @didDismiss="openModal(false)"
    >
      <app-modal :title="popupTitle">
        <setting-date v-if="popupTitle === '유통기한 날짜'"></setting-date>
        <setting-privacy
          @emitCloseModal="openModal(false)"
          v-else-if="popupTitle === '개인정보처리방침'"
        ></setting-privacy>
        <setting-delete-member
          v-else-if="popupTitle === '회원탈퇴'"
          @emitCloseModal="openModal(false)"
        ></setting-delete-member>
      </app-modal>
    </ion-modal>
  </teleport>
  <app-popover :propOpenPopover="isOpenPop" @closePopover="openPopover(false)">
    <setting-logout
      v-if="popupTitle === '로그아웃'"
      @emitClosePopover="openPopover(false)"
    ></setting-logout>
  </app-popover>
</template>

<script lang="ts">
import { IonCard, IonList, IonListHeader, IonModal, IonItem } from "@ionic/vue";
import { computed, defineComponent, ref } from "vue";
import userAPI from "@/assets/api/userAPI";
import environment from "@/config.env";
import AppModal from "./AppModalContainer.vue";
import AppPopover from "./AppPopover.vue";
import SettingLogout from "./SettingModalContent/SettingLogout.vue";
import SettingDate from "./SettingModalContent/SettingDate.vue";
import SettingDeleteMember from "./SettingModalContent/SettingDeleteMember.vue";
import SettingPrivacy from "./SettingModalContent/SettingPrivacy.vue";
export default defineComponent({
  components: {
    IonCard,
    IonList,
    IonItem,
    IonListHeader,
    IonModal,
    AppPopover,
    AppModal,
    SettingLogout,
    SettingDate,
    SettingDeleteMember,
    SettingPrivacy,
  },
  setup() {
    const isOpenRef = ref(false);
    const openModal = (state: boolean) => (isOpenRef.value = state);

    const isOpenPop = ref(false);
    const openPopover = (state: boolean) => (isOpenPop.value = state);

    const popupTitle = ref("");

    /**
     ** itemClickMethod : 버튼 선택시 동작.
     ** index : 리스트중 아이템의 index(number)
     ** open : popover | modal
     */
    const itemClickMethod = (title: string, open?: "popover" | "modal") => {
      popupTitle.value = title;
      if (open === "popover") openPopover(true);
      else if (open === "modal") openModal(true);
    };

    /**기능 리스트 아이템 */
    const cardItems01 = [
      {
        title: "유통기간 알림 날짜",
        method: function () {
          itemClickMethod(this.title, "modal");
        },
      },
    ];

    /**앱 리스트 아이템 */
    const cardItems02 = [
      {
        title: `앱 버전 (v${environment.appVersion})`,
        method: function () {
          itemClickMethod(this.title);
        },
      },
      {
        title: "개인정보처리방침",
        method: function () {
          itemClickMethod(this.title, "modal");
        },
      },
    ];
    /**계정 리스트 아이템 */
    const cardItems03 = [
      {
        title: "로그아웃",
        method: function () {
          itemClickMethod(this.title, "popover");
        },
      },
      {
        title: "회원탈퇴",
        method: function () {
          itemClickMethod(this.title, "modal");
        },
      },
    ];

    return {
      openModal,
      isOpenRef,
      popupTitle,
      cardItems01,
      cardItems02,
      cardItems03,
      openPopover,
      isOpenPop,
    };
  },
});
</script>
<style lang="scss" scope>
ion-header {
  height: auto;
  .header-title {
    font-size: rem-calc(21px) !important;
    font-weight: 600 !important;
  }
  .button-submit {
    font-size: 16px !important;
    font-weight: 600 !important;
  }
}
ion-card {
  margin: {
    left: 0px;
    right: 0px;
  }
  padding: 0px;
  ion-list-header {
    font-size: rem-calc(18px);
    margin-bottom: 8px;
  }
}
</style>