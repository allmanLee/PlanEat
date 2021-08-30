<template>
  <ion-card
    :class="
      buttonMode === 'addActive' ? 'list-button-active' : 'list-buton-disable'
    "
    Expand="block"
    :color="buttonMode === 'addActive' ? 'primary' : ''"
    @click="openPopover"
    ><ion-card-header>
      <ion-card-title class="card-title">
        <ion-grid>
          <ion-row>
            <ion-col>{{ itemName }}</ion-col>
            <ion-col class="text-item-amount">{{ itemAmount }} / D + 1</ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-title>
    </ion-card-header></ion-card
  >
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  popoverController,
} from "@ionic/vue";
import PopoverDeleteVue from "./PopoverDelete.vue";

export default defineComponent({
  components: {
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardTitle,
  },
  props: {
    propIngredient: {
      type: String,
      default: "추가하기",
    },
    propMode: {
      type: String,
      default: "disable",
    },
    propAmount: {
      type: String,
      default: "보통",
    },
  },
  setup(props) {
    const buttonMode = computed(() => props.propMode);
    const itemName = computed(() => props.propIngredient);
    const itemAmount = computed(() => props.propAmount);
    return { itemName, buttonMode, itemAmount };
  },
  methods: {
    async openPopover(ev: Event) {
      if (this.buttonMode === "disable") {
        const popover = await popoverController.create({
          component: PopoverDeleteVue,
          cssClass: "my-custom-class",
          event: ev,
          translucent: true,
        });
        await popover.present();

        const { role } = await popover.onDidDismiss();
        console.log("onDidDismiss resolved with role", role);
      } else {
        this.$emit("callAddButton", "why");
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.list-button-active {
  --border-width: 2px;
}
.list-buton-disable {
  --border-width: 1px;
  --background: white;
}
.card-title {
  font-size: 16px;
}
.text-item-amount {
  text-align: end;
  color: #d5a506;
  opacity: 0.6;
}
</style>
