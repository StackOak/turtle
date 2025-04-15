export default defineEventHandler(async (event) => {
    const  config = useRuntimeConfig()
    const query = getQuery(event)
    const res= await <any>$fetch(`${config.public.userApiBase}/article/list`, {
        method: 'GET',
        query
    })
    return res.data
})
