<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="end">
        <ion-button class="button-submit" @click="submit"> 확인 </ion-button>
      </ion-buttons>
      <ion-title>{{ headerTitle }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <slot></slot>
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons
} from "@ionic/vue";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    title: { type: String, default: "Super Modal" }
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons
  },

  emits: ["submit"],
  setup(props, { emit }) {
    const headerTitle = computed(() => {
      return props.title;
    });
    const submit = () => {
      emit("submit");
      console.log("보내기");
    };
    return { headerTitle, submit };
  }
});
</script>
<style>
.button-submit {
  font-weight: 600 !important;
}
</style>