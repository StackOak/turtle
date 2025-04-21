import {process} from "std-env";

export default defineNuxtConfig({
    app: {
        /* head: {
             meta:[
                 {name: 'google-adsense-account', content: 'ca-pub-5856655690528931'}
             ],
             script: [
                 {
                     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5856655690528931',
                     async: true,
                     crossorigin: 'anonymous'
                 }
             ]
         }*/
    },
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
        ['@nuxtjs/google-adsense', {
            id: 'ca-pub-5856655690528931'
        }],
    ],
   /* googleAdsense: {
        id: 'ca-pub-5856655690528931'
    },*/
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
