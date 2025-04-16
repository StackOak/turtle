export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const res= await <any>$fetch(`${config.public.userApiBase}/nav-links`)
    return res.data
})
