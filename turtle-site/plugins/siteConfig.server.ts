import {process} from "std-env";
 import {useSiteConfig} from "~/composables/useSiteConfig";

export default defineNuxtPlugin(async (nuxtApp) => {
    if (process.server) {
        const config = useSiteConfig()
        try {
            const { data } = await useFetch('/api/config', {
                transform: (res: any) => {
                    if (res.code === 200) {
                        return {
                            law: res.data.law_config,
                            seo: res.data.seo_config
                        }
                    }
                    return null
                }
            })

            if (data.value) {
                config.value = data.value
            }
        } catch (error) {
            console.error('Failed to fetch site config:', error)
        }
    }
})


