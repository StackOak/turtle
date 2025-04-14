export default defineAppConfig({
    //开启SSR服务端渲染
    ssr: true,
    //全局定制UCard组件
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
