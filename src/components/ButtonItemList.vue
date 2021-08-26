<template>
  <ion-button
    :disabled="buttonMode === 'disable' ? true : false"
    :class="buttonMode === 'addActive' ? 'list-button-plus' : ''"
    Expand="block"
    :color="buttonMode === 'addActive' ? 'primary' : 'dark'"
    fill="outline"
    >{{ propIngredient }}</ion-button
  >
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { IonButton } from "@ionic/vue";

export default defineComponent({
  components: {
    IonButton,
  },
  props: {
    propIngredient: {
      type: String,
      default: "+",
    },
    propMode: {
      type: String,
      default: "disable",
    },
  },
  setup(props) {
    const buttonMode = computed(() => props.propMode);
    return { buttonMode };
  },
});
</script>
<style lang="scss" scoped>
.list-button-plus {
  --border-width: 2px;
}
</style>
