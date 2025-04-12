import {process} from "std-env";

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            userApiBase: process.env.USER_API_BASE || 'http://localhost:8000/api/v1',
            adminApiBase: process.env.ADMIN_API_BASE || 'http://localhost:8000'
        }
    },
    nitro: {
        devProxy: {
            '/api': {
                target: 'http://192.168.0.151:8000', // 后端基础 URL
                changeOrigin: true, // 处理跨域
                prependPath: true // 保留原始路径
            }
        },
        // 生产环境代理配置
        // routeRules: {
        //     '/api/**': {
        //         proxy: 'http://192.168.0.151:8000'
        //     }
        // }
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
