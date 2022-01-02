<template>
  <ion-header mode="ios">
    <ion-toolbar>
      <ion-title mode="md" class="header-title">{{ headerTitle }}</ion-title>
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
    IonHeader,
    IonTitle,
    IonToolbar,
  },

  emits: ["submit"],
  setup(props, { emit }) {
    const headerTitle = computed(() => {
      return props.title;
    });
    const submit = () => {
      emit("submit");
    };
    return { headerTitle, submit };
  },
});
</script>
<style lang="scss">
ion-header {
  height: auto;
  .header-title {
    font-size: 16px !important;
    font-weight: 600 !important;
  }
  .button-submit {
    font-size: 16px !important;
    font-weight: 600 !important;
  }
}
</style>