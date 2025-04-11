// 通用请求工具类 只在客户端交互使用
interface RequestConfig {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: Record<string, any>
    params?: Record<string, any>
    headers?: Record<string, string>
}

// API配置接口
interface ApiConfig {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

// 静态Http工具类
export const Https = {
    // 默认配置
    defaultConfig: {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    } as RequestConfig,

    // 核心请求方法
    async action<T>(api: ApiConfig, config: RequestConfig = {}): Promise<T> {
        const runtimeConfig = useRuntimeConfig()
        const baseURL = runtimeConfig.public.apiBase
        // 合并配置
        const requestConfig: RequestConfig = {
            ...Https.defaultConfig,
            ...config,
            method: api.method || config.method || 'GET',
        }

        // 添加token
        const token = useCookie('Authorization').value
        if (token) {
            requestConfig.headers = {
                ...requestConfig.headers,
                Authorization: `Bearer ${token}`,
            }
        }

        try {
            const response = await <any>$fetch(`${baseURL}${api.url}`, {
                ...requestConfig,
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : undefined,
                query: requestConfig.params,
            })
            const toast = useToast();
            if (response.code !== 200) {
                toast.add({title: response.msg, color: 'error'});
            }
            //useRouter().push({path:'/404'})
            //在这里根据状态做一些处理
            return response as T
        } catch (error) {
            console.error('Request failed:', error)
            throw error
        }
    },
}
