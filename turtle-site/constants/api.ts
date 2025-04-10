export const API = {
    USER: {
        account_login: { url: '/user/login', method: 'POST' as const },
    },
    ARTICLE: {
        list: { url: '/article/list', method: 'POST' as const },
    }
} as const;
