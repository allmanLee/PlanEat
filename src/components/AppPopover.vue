<template>
  <teleport to="body">
    <div v-if="openPopover" class="popover-background" @click="ClickOutside">
      <ion-card class="popover-content">
        <slot></slot>
      </ion-card>
    </div>
  </teleport>
</template>

<script>
import { computed, defineComponent, onUpdated, ref } from "vue";
import { IonCard } from "@ionic/vue";

export default defineComponent({
  name: "Popover",
  components: {
    IonCard
  },
  props: {
    propOpenPopover: {
      type: Boolean,
      default: false
    }
  },
  emits: ["closePopover"],
  setup(props, { emit }) {
    const openPopover = computed(() => {
      return props.propOpenPopover;
    });
    // const popoverBackground = ()=> {
    // }
    const ClickOutside = () => {
      emit("closePopover");
    };
    return { openPopover, ClickOutside };
  }
});
</script>
<style scoped>
.popover-background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}
.popover-content {
  position: absolute;
  margin: 0;
  box-sizing: content-box;
  height: auto;
  width: 80vw;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.02);
}
</style>