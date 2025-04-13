export default defineEventHandler(async (event) => {
    const {public: {userApiBase}} = useRuntimeConfig()
    const body = await readBody(event)
    return await $fetch(`${userApiBase}/search`, {
        method: 'POST',
        body: body
    })
})
