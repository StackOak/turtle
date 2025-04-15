export default defineEventHandler(async (event) => {
    const  config = useRuntimeConfig()
    const query = getQuery(event)
    return await $fetch(`${config.public.userApiBase}/book/list`, {
        method: 'GET',
        query
    })
})
