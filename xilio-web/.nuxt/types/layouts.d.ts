import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "root" | "components-console-left-menu" | "components-site-left-menu" | "components-site-right-card" | "console-default" | "site-default" | "site-detail"
declare module "../../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_db0@0.3.1_eslint@9.24.0_jiti@2.4.2__ioredis@5.6.0_lightning_lpyvg7hxwlxeo4rfp6fwvd57ai/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}