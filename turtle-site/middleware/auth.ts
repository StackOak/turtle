
export default defineNuxtRouteMiddleware((to, from) => {
    if (!isAuthenticated()) {
        return navigateTo('/console/login')
    }
})
const isAuthenticated = () => {
    return useCookie('Authorization').value !== ''
}
