export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = getCookie(event, "Authorization")
    const res = await <any>$fetch(`${config.public.adminApiBase}/menu/list`, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return res.data
})
