export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const query = getQuery(event)
    return await <any>$fetch(`${config.public.userApiBase}/tags`, {
        method: 'GET',
        query
    })
})
