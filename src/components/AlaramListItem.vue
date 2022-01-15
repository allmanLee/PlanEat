<template>
  <ion-item button @click="selectItem">
    <ion-avatar slot="start">
      <ion-icon color="primary" :icon="fishOutline"> </ion-icon>
    </ion-avatar>
    <ion-label>
      <h2>유통기간 알림</h2>
      <h3>
        [{{ frizeName }}] {{ ingredientName }} {{ remainingDates }}일 남음
      </h3>
      <p>{{ theDate }}</p>
    </ion-label>
  </ion-item>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { fishOutline } from "ionicons/icons";
import { IonItem, IonIcon, IonAvatar, IonLabel } from "@ionic/vue";
import { useStore } from "@/store/index";
import { AlaramIngredientType } from "@/types/frige";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    propItemData: {
      type: Object as PropType<AlaramIngredientType>,
      default: () => {
        return {
          engName: "Garlic",
          expirationDate: "2021-11-27",
          frizeId: "0df55c4a1d3e43c6883f86ab942d4a22",
          id: "20211120Garlic",
          name: "마늘",
          updatedDate: "2021-11-20",
        };
      },
    },
  },
  components: {
    IonItem,
    IonIcon,
    IonAvatar,
    IonLabel,
  },
  setup(prop) {
    const store = useStore();
    const frizeId = computed(() => {
      return prop.propItemData.frizeId;
    });
    const frizeName = ref(store.getters["frige/getCateName"](frizeId.value));

    const ingredientName = computed(() => {
      return prop.propItemData.name;
    });
    const theDate = computed(() => {
      return prop.propItemData.updatedDate;
    });
    const remainingDates = computed(() => {
      if (
        prop.propItemData.expirationDate !== undefined &&
        prop.propItemData.updatedDate !== undefined
      ) {
        const exDateArr = prop.propItemData.expirationDate
          .split("-")
          .map((el) => Number(el));
        const upDateArr = prop.propItemData.updatedDate
          .split("-")
          .map((el) => Number(el));
        const upDate = new Date(
          `${upDateArr[0]}/${upDateArr[1]}/${upDateArr[2] + 1}`
        );
        const exDate = new Date(
          `${exDateArr[0]}/${exDateArr[1]}/${exDateArr[2] + 1}`
        );
        const dateDifference =
          (exDate.getTime() - upDate.getTime()) / (1000 * 60 * 60 * 24);

        return dateDifference;
      }
      return "";
    });
    const router = useRouter();
    const selectItem = () => {
      router.push({
        path: "tab3/tab3Add",
      });
      store.commit("frige/fetchFrizeCateSelected", frizeId.value);
      store.dispatch("frige/frizeIngredientGet", {
        frizeId: frizeId.value,
      });
    };

    return {
      fishOutline,
      selectItem,
      frizeName,
      ingredientName,
      remainingDates,
      theDate,
    };
  },
});
</script>
<style lang="scss" scoped>
ion-item {
  --padding-start: 0px;
  ion-avatar {
    width: 48px;
    height: 48px;
    line-height: 48px;
    border: 1px solid var(--ion-color-primary);
    margin-right: 12px;
    text-align: center;
    vertical-align: middle;
    ion-icon {
      vertical-align: middle;
      font-size: rem-calc(28px);
      margin-top: -2.4px;
    }
  }
  ion-label {
    h2 {
      font-size: rem-calc(14px);
      font-weight: 600;
    }
    h3 {
      font-size: rem-calc(16px);
    }
  }
}
</style>
