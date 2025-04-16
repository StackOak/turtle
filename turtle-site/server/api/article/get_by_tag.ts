export default defineEventHandler(async (event) => {
    const  config = useRuntimeConfig()
    const query =  getQuery(event)
    const res= await <any>$fetch(`${config.public.userApiBase}/article/get-by-tag`, {
        method: 'GET',
        query
    })
    return res.data
})
