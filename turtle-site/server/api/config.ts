export default defineEventHandler(async (event) => {
    const {public: {userApiBase}} = useRuntimeConfig()
    return await $fetch(`${userApiBase}/configs`, {
        method: 'GET'
    })
})
