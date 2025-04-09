export default defineAppConfig({
    ssr: true,
    ui: {
       /* navigationMenu: {
            slots: {
                linkLeadingIcon: 'shrink-0 size-7',
                linkLabel: 'truncate text-xl',
            }
        },*/
        card: {
            slots: {
                root: 'rounded-[calc(var(--ui-radius)*2)]',
                header: 'p-2 sm:px-3',
                body: 'p-4 sm:p-6 sm:pt-2',
                footer: 'p-2 sm:px-3'
            },

        },
        colors: {},
        button: {
            defaultVariants: {
                // Set default button color to neutral
                // color: 'neutral'
            }
        }
    }
})
