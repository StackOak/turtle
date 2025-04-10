export const API = {
    USER: {
        login: {url: '/user/login', method: 'POST' as const},
        logout: {url: '/user/logout', method: 'POST' as const},
    },
    ARTICLE: {
        list: {url: '/article/list', method: 'POST' as const},
    }
} as const;
