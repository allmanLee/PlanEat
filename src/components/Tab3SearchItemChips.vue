<template>
  <ion-item-group
    ><ion-chip
      v-for="(item, index) in addItems"
      :key="index"
      @click="cancleItem"
    >
      <ion-label class="event--disable">{{ item.name }}</ion-label
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
    const addItems = computed(() => {
      return props.propAddItems;
    });
    const cancleItem = (event: VueEvent.Mouse<HTMLButtonElement>) => {
      const chipLabel = event.target.children[0].innerHTML;
      console.log(addItems.value);
      const searchOfAddItems = addItems.value.filter((el: any) => {
        if (el.name === chipLabel) {
          return el;
        }
      });
      console.log(searchOfAddItems[0]);
      emit("emitCancleItem", searchOfAddItems[0]);
    };

    return { addItems, closeCircle, cancleItem };
  },
});
</script>
<style lang="scss" scoped>
.event--disable {
  pointer-events: none;
}
ion-chip {
  margin-left: 0;
}
</style>

