<template>
  <div>
    <ion-input
      ref="test"
      type="email"
      :placeholder="propPlaceholder"
      class="input-outline"
    ></ion-input>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs } from "vue";
import { IonInput } from "@ionic/vue";
import { arrowBack } from "ionicons/icons";
import { useStore } from "@/store/index";

export default defineComponent({
  props: {
    propPlaceholder: String,
    propAutofocus: {
      default: false,
      type: Boolean,
    },
  },
  components: { IonInput },
  setup(props) {
    const store = useStore();
    const Autofocus = computed(() => {
      return props.propAutofocus;
    });
    const test = ref();
    const header = computed(() => {
      return store.state.ui.header;
    });
    onMounted(() => {
      if (test.value !== null) {
        //null체크
        if (Autofocus.value == true) {
          setTimeout(() => {
            test.value.$el.children[0].focus();
          }, 200);
        }
      }
    });
    return { test, arrowBack, header };
  },
});
</script>
<style lang="scss" scope>
/* outline-input-text-box */
.input-outline > input {
  border-radius: 4px !important;
  border: 2px solid #9e9e9e !important;
  background-color: #f5f5f5;
  &:focus {
    background-color: #ffffff;
    border: 2px solid #f79503 !important;
  }
}
</style>
