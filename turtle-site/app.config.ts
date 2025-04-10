export default defineAppConfig({


    ssr: true,
    ui: {
        card: {
            slots: {
                root: 'rounded-[calc(var(--ui-radius)*2)]',
                header: 'p-2 sm:px-3',
                body: 'p-4 sm:p-6 sm:pt-2',
                footer: 'p-2 sm:px-3'
            },
        },
    }
})
