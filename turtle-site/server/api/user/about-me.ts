export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    return await $fetch(`${config.public.userApiBase}/about-me`, {
        method: 'GET',
    })
})
