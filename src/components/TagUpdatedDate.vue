<template>
  <ion-chip class="chip-date">
    <ion-label>{{ fetchDate }}</ion-label>
  </ion-chip>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { IonLabel, IonChip } from "@ionic/vue";
export default defineComponent({
  components: {
    IonLabel,
    IonChip,
  },
  props: {
    propDate: {
      type: Date,
      default: Date,
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

      const year = UpdatedDate.getFullYear();
      const month = UpdatedDate.getMonth() + 1;
      const day = UpdatedDate.getDate();
      const dayLabel = week[UpdatedDate.getDay()];
      return `${year}년 ${month}월 ${day}일 ${dayLabel}`;
    });
    return {
      fetchDate,
    };
  },
});
</script>
<style lang="scss" scoped>
.chip-date {
  --background: #2e2e2e;
  --color: white;
  font-size: 12px;
}
</style>
