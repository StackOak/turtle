import { inject, computed } from "vue";
export const buttonGroupInjectionKey = Symbol("nuxt-ui.button-group");
export function useButtonGroup(props) {
  const buttonGroup = inject(buttonGroupInjectionKey, void 0);
  return {
    orientation: computed(() => buttonGroup?.value.orientation),
    size: computed(() => props?.size ?? buttonGroup?.value.size)
  };
}
