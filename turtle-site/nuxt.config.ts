import {process} from "std-env";

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            userApiBase: process.env.USER_API_BASE,
            adminApiBase: process.env.ADMIN_API_BASE
        }
    },
    nitro: {
        devProxy: {
            '/admin': {
                target: 'http://localhost:8000', // 后端基础 URL
                changeOrigin: true, // 处理跨域
                prependPath: true // 保留原始路径
            }
        },

    },
    devtools: {enabled: true},
    ssr: true,
    modules: [
        '@nuxt/ui',
    ],
    css: ['~/assets/css/main.css'],
    icon: {
        customCollections: [
            {
                prefix: 'turtle',
                dir: './assets/icons'
            }]
    },
    future: {
        compatibilityVersion: 4
    },
    ui: {
        fonts: false,
        colorMode: false
    },
    compatibilityDate: '2024-11-27'
})
