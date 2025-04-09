

export const Callbacks = (cherryInstance: any, emit: any) => ({
    urlProcessor: (url: string, srcType: any) => url,
    fileUpload(file: File, callback: (url: string, params?: any) => void) {
        if (/image/i.test(file.type)) {
            const formData = new FormData();
            formData.append("file", file);


        } else {
            callback("images/demo-dog.png");
        }
    },
    //内容改变的时回调
    afterChange: (text: any, html: any) => {

        if (emit) {
            emit("markdown-change", {content: text});
        }
    },
    beforeImageMounted: (srcProp: any, src: any) => ({srcProp, src}),
});
