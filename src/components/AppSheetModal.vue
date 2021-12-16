<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-button @click="openModal()">Open Modal</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonButton, IonContent, IonPage, modalController } from "@ionic/vue";

export default {
  components: { IonButton, IonContent, IonPage },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: Modal,
        initialBreakpoint: 0.5,
        breakpoints: [0, 0.5, 1],
      });
      return modal.present();
    },
  },
};
</script>