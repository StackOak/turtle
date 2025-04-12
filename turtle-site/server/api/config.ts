export default defineEventHandler(async (event) => {
    const { public: { userApiBase } } = useRuntimeConfig()
    const config = await $fetch(`${userApiBase}/configs`, {
        method: 'GET',
        headers: {
            'accept': '*/*'
        }
    })

    return config
})
