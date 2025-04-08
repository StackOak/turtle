import * as _nuxt_schema from '@nuxt/schema';
import { components } from 'reka-ui/constant';

interface ModuleOptions {
    components: Partial<Record<keyof typeof components, boolean>> | boolean;
    prefix: string;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

export { type ModuleOptions, _default as default };
