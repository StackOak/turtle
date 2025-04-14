export default defineEventHandler(async (event) => {
    const {public: {userApiBase}} = useRuntimeConfig()
    const body = await readBody(event)
    const res= await <any>$fetch(`${userApiBase}/search`, {
        method: 'POST',
        body: body
    })
    return res.data
})
