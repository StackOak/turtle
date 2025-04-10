// utils/http.ts
import { useAuth } from '~/stores/auth' // 假设你有一个auth store管理token

// 请求配置接口
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

// 创建Http类
class HttpClient {
    // 基础URL
    private baseURL: string = '/api'

    // 默认配置
    private defaultConfig: RequestConfig = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // 核心请求方法
    async action<T>(api: ApiConfig, config: RequestConfig = {}): Promise<T> {
        // 合并配置
        const requestConfig: RequestConfig = {
            ...this.defaultConfig,
            ...config,
            method: api.method || config.method || 'GET',
        }

        // 添加token
        const token = useAuth().value
        if (token) {
            requestConfig.headers = {
                ...requestConfig.headers,
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await $fetch(`${this.baseURL}${api.url}`, {
                ...requestConfig,
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : undefined,
                query: requestConfig.params
            })
            return response as T
        } catch (error) {
            // 错误处理
            console.error('Request failed:', error)
            throw error
        }
    }
}

// 实例化Http客户端
export const Http = new HttpClient()
