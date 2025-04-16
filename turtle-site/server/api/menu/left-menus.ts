export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const res= await <any>$fetch(`${config.public.userApiBase}/left-menus`)
    return res.data
})
