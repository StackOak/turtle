export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const res = await <any>$fetch(`${config.public.userApiBase}/about-me`, {
        method: 'GET'
    })
    return res.data
})
