export default defineNuxtRouteMiddleware((to, from) => {
    if (isUnAuthenticated()) {
        return navigateTo('/console/login')
    }
})
const isUnAuthenticated = () => {
    return useCookie('Authorization').value == null || '' || undefined
}
