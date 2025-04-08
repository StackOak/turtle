import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth"
declare module "../../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_db0@0.3.1_eslint@9.24.0_jiti@2.4.2__ioredis@5.6.0_lightning_lpyvg7hxwlxeo4rfp6fwvd57ai/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}