export const API = {
    ARTICLE: {
        LIST: '/portal/article/list',      // 文章列表
        DETAIL: '/api/portal/article/detail',  // 文章详情
        CREATE: '/portal/article/create'   // 创建文章
    },
    USER: {
        LOGIN: '/portal/user/login'        // 用户登录
    }
} as const;
