export default defineEventHandler(async (event) => {
    const  config = useRuntimeConfig()
    const query = getQuery(event)
    const res= await <any>$fetch(`${config.public.userApiBase}/book/items`, {
        method: 'GET',
        query
    })
    return res.data
})
