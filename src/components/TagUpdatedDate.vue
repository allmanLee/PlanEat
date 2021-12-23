<template>
  <hr />
  <ion-label>{{ fetchDate }}</ion-label>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { IonLabel } from "@ionic/vue";
export default defineComponent({
  components: {
    IonLabel,
  },
  props: {
    propDate: {
      type: String,
      default: "0000-00-00",
    },
  },
  setup(props) {
    const fetchDate = computed(() => {
      const UpdatedDate = props.propDate;
      const week = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
      ];
      const splitedDate = UpdatedDate.split("-");
      const updatedDay = new Date(
        `${splitedDate[0]}/${splitedDate[1]}/${splitedDate[2]}`
      );
      const dayLabel = week[updatedDay.getDay()];
      return `${splitedDate[0]}년 ${splitedDate[1]}월 ${splitedDate[2]}일 ${dayLabel}`;
    });
    return {
      fetchDate,
    };
  },
});
</script>
<style lang="scss" scoped>
ion-label {
  color: var(--custom-gray-02);
}
</style>
