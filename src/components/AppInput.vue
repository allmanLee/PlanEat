<template>
  <ion-input
    ref="test"
    :type="type"
    :placeholder="propPlaceholder"
    class="input-outline"
    :value="valueText"
  ></ion-input>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs } from "vue";
import { IonInput } from "@ionic/vue";
import { arrowBack } from "ionicons/icons";
import { useStore } from "@/store/index";

export default defineComponent({
  props: {
    propPlaceholder: String,
    propType: {
      default: "text",
      type: String,
    },
    propAutofocus: {
      default: false,
      type: Boolean,
    },
    propValue: {
      defalt: "",
      type: String,
    },
  },
  components: { IonInput },
  setup(props) {
    const store = useStore();
    const Autofocus = computed(() => {
      return props.propAutofocus;
    });
    const valueText = computed(() => {
      return props.propValue;
    });
    const type = computed(() => {
      return props.propType;
    });
    const test = ref();

    onMounted(() => {
      if (test.value !== null) {
        //null체크
        if (Autofocus.value == true) {
          setTimeout(() => {
            test.value.$el.children[0].focus();
          }, 2000);
        }
      }
    });
    return { valueText, test, arrowBack, type };
  },
});
</script>
<style lang="scss" scope>
/* outline-input-text-box */
.input-outline > input {
  border-radius: 4px !important;
  border: 2px solid var(--custom-gray-04) !important;
  background-color: #f5f5f5 !important;
  &:focus {
    background-color: #ffffff !important;
    border: 2px solid #f79503 !important;
    transition: border 0.15s ease;
  }
}
</style>
