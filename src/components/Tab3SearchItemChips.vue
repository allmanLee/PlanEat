<template>
  <ion-item-group
    ><ion-chip
      v-for="(item, index) in propAddItems"
      :key="index"
      @click="cancleItem"
    >
      <ion-label class="event--disable">{{ item }}</ion-label
      ><ion-icon class="event--disable" :icon="closeCircle"></ion-icon
    ></ion-chip>
  </ion-item-group>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { IonItemGroup, IonIcon, IonLabel, IonChip } from "@ionic/vue";
import { closeCircle } from "ionicons/icons";
import { VueEvent } from "@/types/event";
export default defineComponent({
  components: { IonItemGroup, IonIcon, IonLabel, IonChip },
  props: {
    propAddItems: {
      type: Array,
      default: () => {
        return ["a", "b", "c"];
      },
    },
  },
  setup(props, { emit }) {
    const addItem = computed(() => {
      return props.propAddItems;
    });
    const cancleItem = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      const chipLabel = event.target.children[0].innerHTML;
      emit("emitCancleItem", chipLabel);
    };

    return { addItem, closeCircle, cancleItem };
  },
});
</script>
<style scoped>
.event--disable {
  pointer-events: none;
}
</style>

