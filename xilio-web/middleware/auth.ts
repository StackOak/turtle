export default defineNuxtRouteMiddleware((to, from) => {
    // isAuthenticated()是一个验证用户是否已经认证的示例方法
    if (!isAuthenticated()) {
        return navigateTo('/console/login')
    }
})
const isAuthenticated=()=>{
    return true
}
