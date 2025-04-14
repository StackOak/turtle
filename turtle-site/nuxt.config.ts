import {process} from "std-env";

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            userApiBase: process.env.USER_API_BASE,
            adminApiBase: process.env.ADMIN_API_BASE
        }
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
    devServer: {
        //Nuxt项目启动端口号
        port: Number(process.env.PORT) || 3000,
        host: '0.0.0.0'
    },
    compatibilityDate: '2024-11-27'
})
