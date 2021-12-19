<template>
  <ion-header mode="ios">
    <ion-toolbar>
      <ion-title class="header-title">{{ headerTitle }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <slot></slot>
</template>

<script>
import { IonHeader, IonTitle, IonToolbar } from "@ionic/vue";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    title: { type: String, default: "Super Modal" },
  },
  components: {
    // IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    // IonButton,
    // IonButtons,
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
  },
});
</script>
<style>
.header-title {
  font-size: 16px !important;
  font-weight: 600 !important;
}
.button-submit {
  font-size: 16px !important;
  font-weight: 600 !important;
}
</style>