// vuex-shim.d.ts
import  {RootState} from '@/store/index'
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    test: number;
  }

  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}