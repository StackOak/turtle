export default defineAppConfig({
   ssr:true,
  ui: {
    card: {
      slots: {
        root: 'rounded-[calc(var(--ui-radius)*2)]',
        header: 'p-2 sm:px-3',
        body: 'p-3 sm:p-5 sm:pt-2',
        footer: 'p-2 sm:px-3'
      },
    },
    colors: {

    },
    button: {
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      }
    }
  }
})
