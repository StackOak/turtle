import {Callbacks} from "./callbacks";
//@ts-nocheck
export const getConfig = ({
                              id = '3721',
                              value = '',
                              preview = false,
                              float = false,
                              codeTheme = 'tomorrow dark',
                              mainTheme = 'default',
                              anchorStyle = 'none',
                              cherryInstance,
                              emit
                          }: {
    id?: string;
    value?: string;
    preview?: boolean;
    float?: boolean;
    codeTheme?: string;
    mainTheme?: string;
    anchorStyle?: string;
    cherryInstance?: never;
    emit?: never; // emit 是一个函数
}) => {
    const callbacks = Callbacks(cherryInstance, emit); // 将 emit 传递到 callbacks 中
    return {
        id: id,
        value: value,
        // 解析引擎配置
        engine: {
            // 全局配置
            global: {
                // 是否启用经典换行逻辑
                // true：一个换行会被忽略，两个以上连续换行会分割成段落，
                // false： 一个换行会转成<br>，两个连续换行会分割成段落，三个以上连续换行会转成<br>并分割段落
                classicBr: false,
                /**
                 * 适配流式会话的场景，开启后将具备以下特性：
                 * - cherry渲染频率从50ms/次提升到10ms/次
                 * - 代码块自动闭合，相当于强制 `engine.syntax.codeBlock.selfClosing=true`
                 * - 文章末尾的段横线标题语法（`\n-`）失效
                 * - 表格语法自动闭合，相当于强制`engine.syntax.table.selfClosing=true`
                 * - 加粗、斜体语法自动闭合，相当于强制`engine.syntax.fontEmphasis.selfClosing=true`
                 *
                 * 后续如果有新的需求，可提issue反馈
                 */
                flowSessionContext: true,
            },
            // 内置语法配置
            syntax: {
                list: {
                    listNested: false, // 同级列表类型转换后变为子级
                    indentSpace: 2, // 默认2个空格缩进
                },
                table: {
                    enableChart: false,
                    selfClosing: false, // 自动闭合，为true时，当输入第一行table内容时，cherry会自动按表格进行解析
                },
                codeBlock: {
                    wrap: true, // 超出长度是否换行，false则显示滚动条
                    lineNumber: true, // 默认显示行号
                    copyCode: true, // 是否显示“复制”按钮
                    editCode: true, // 是否显示“编辑”按钮
                    changeLang: true, // 是否显示“切换语言”按钮
                    expandCode: true, // 是否展开/收起代码块，当代码块行数大于10行时，会自动收起代码块
                    selfClosing: true, // 自动闭合，为true时，当md中有奇数个```时，会自动在md末尾追加一个```
                    mermaid: {
                        svg2img: false, // 是否将mermaid生成的画图变成img格式
                    },
                },
                emoji: {
                    useUnicode: true, // 是否使用unicode进行渲染
                },
                fontEmphasis: {
                    /**
                     * 是否允许首尾空格
                     * 首尾、前后的定义： 语法前**语法首+内容+语法尾**语法后
                     * 例：
                     *    true:
                     *           __ hello __  ====>   <strong> hello </strong>
                     *           __hello__    ====>   <strong>hello</strong>
                     *    false:
                     *           __ hello __  ====>   <em>_ hello _</em>
                     *           __hello__    ====>   <strong>hello</strong>
                     */
                    allowWhitespace: false,
                    selfClosing: false, // 自动闭合，为true时，当输入**XXX时，会自动在末尾追加**
                },
                strikethrough: {
                    /**
                     * 是否必须有前后空格
                     * 首尾、前后的定义： 语法前**语法首+内容+语法尾**语法后
                     * 例：
                     *    true:
                     *            hello wor~~l~~d     ====>   hello wor~~l~~d
                     *            hello wor ~~l~~ d   ====>   hello wor <del>l</del> d
                     *    false:
                     *            hello wor~~l~~d     ====>   hello wor<del>l</del>d
                     *            hello wor ~~l~~ d     ====>   hello wor <del>l</del> d
                     */
                    needWhitespace: false,
                },
                mathBlock: {
                    engine: 'MathJax', // katex或MathJax
                    src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js',
                    plugins: true, // 默认加载插件
                },
                inlineMath: {
                    engine: 'MathJax', // katex或MathJax
                },
                toc: {
                    /** 默认只渲染一个目录 */
                    allowMultiToc: true,
                    /** 是否显示自增序号 */
                    showAutoNumber: false,
                },
                header: {
                    /**
                     * 标题的样式：
                     *  - default       默认样式，标题前面有锚点
                     *  - autonumber    标题前面有自增序号锚点
                     *  - none          标题没有锚点
                     */
                    anchorStyle: anchorStyle,
                    /**
                     * 是否开启严格模式
                     *    true：严格模式
                     *      # head ⭕️ valid
                     *      #head ❌ invalid
                     *    false：宽松模式
                     *      # head ⭕️ valid
                     *      #head ⭕️ valid
                     */
                    strict: false,
                },
                htmlBlock: {
                    /**
                     * 是否过滤html标签中的style属性
                     */
                    filterStyle: false,
                },
            },
        },

        editor: {
            id: 'code', // textarea 的id属性值
            name: 'code', // textarea 的name属性值
            autoSave2Textarea: false, // 是否自动将编辑区的内容回写到textarea里
            // 编辑器的高度，默认100%，如果挂载点存在内联设置的height则以内联样式为主
            height: '100%',
            // defaultModel 编辑器初始化后的默认模式，一共有三种模式：1、双栏编辑预览模式；2、纯编辑模式；3、预览模式
            // edit&preview: 双栏编辑预览模式
            // editOnly: 纯编辑模式（没有预览，可通过toolbar切换成双栏或预览模式）
            // previewOnly: 预览模式（没有编辑框，toolbar只显示“返回编辑”按钮，可通过toolbar切换成编辑模式）
            defaultModel: 'edit&preview',
            // 粘贴时是否自动将html转成markdown
            convertWhenPaste: true,
            // 快捷键风格，目前仅支持 sublime 和 vim
            keyMap: 'sublime',
            codemirror: {
                // 是否自动focus 默认为true
                autofocus: true,
            },
            writingStyle: 'normal', // 书写风格，normal 普通 | typewriter 打字机 | focus 专注，默认normal
            keepDocumentScrollAfterInit: false, // 在初始化后是否保持网页的滚动，true：保持滚动；false：网页自动滚动到cherry初始化的位置
            showFullWidthMark: true, // 是否高亮全角符号 ·|￥|、|：|“|”|【|】|（|）|《|》
            showSuggestList: true, // 是否显示联想框
        },
        toolbars: {
            showToolbar: true, // false：不展示顶部工具栏； true：展示工具栏; toolbars.showToolbar=false 与 toolbars.toolbar=false 等效
            toolbar: [
                'bold',
                'italic',
                'strikethrough',
                '|',
                'color',
                'header',
                'ruby',
                '|',
                'list',
                'panel',
                'justify',
                'detail',
                "size",
                "drawIo",
                "ol",
                "ul",
                "checklist",
                "formula",
                {
                    insert: [
                        'image',
                        // 'audio',
                        'link',
                        'hr',
                        'br',
                        'code',
                        'formula',
                        'toc',
                        'table',
                        'line-table',
                        'bar-table',
                        'pdf',
                        'word',
                        'file'
                    ],
                },
                "graph",
                'shortcutKey',
                "togglePreview",
                "codeTheme",
                "search",
            ],
            bubble: ['bold', 'italic', 'underline', 'strikethrough', 'sub', 'sup', 'quote', '|', 'size', 'color'], // array or false
            toolbarRight: ["fullScreen", "|", "export", "wordCount"],
            sidebar: ["mobilePreview", "copy", "theme"],
            float: float ? ['h1', 'h2', 'h3', '|', 'checklist', 'quote', 'table', 'code'] : false, // array or false
            hiddenToolbar: [], // 不展示在编辑器中的工具栏，只使用工具栏的api和快捷键功能
            // 一些按钮的配置信息
            config: {
                formula: {
                    showLatexLive: true, // true: 显示 www.latexlive.com 外链； false：不显示
                    templateConfig: false, // false: 使用默认模板
                },
                changeLocale: [
                    {
                        locale: 'zh_CN',
                        name: '中文',
                    },
                    {
                        locale: 'en_US',
                        name: 'English',
                    }
                ],
            },
        },
        // 打开draw.io编辑页的url，如果为空则drawio按钮失效
        drawioIframeUrl: 'http://drawio.stackoak.com',
        // drawio iframe的样式
        drawioIframeStyle: 'width:100%;height:100%',
        /**
         * 上传文件的时候用来指定文件类型
         */
        fileTypeLimitMap: {
            //  audio: 'audio/*',
            image: 'image/*',
            word: '.doc,.docx',
            pdf: '.pdf',
            file: '*',
        },
        /**
         * 上传文件的时候是否开启多选
         */
        multipleFileSelection: {
            video: false,
            audio: false,
            image: false,
            word: false,
            pdf: false,
            file: false,
        },
        callback: {
            /**
             * 全局的URL处理器
             * @param {string} url 来源url
             * @param {'image'|'audio'|'video'|'autolink'|'link'} srcType 来源类型
             * @returns
             */
            urlProcessor: callbacks.urlProcessor,
            fileUpload: callbacks.fileUpload,
            beforeImageMounted: callbacks.beforeImageMounted,
        },
        event: {
            // 当编辑区内容有实际变化时触发
            afterChange: callbacks.afterChange,
        },
        previewer: {
            dom: false,
            className: 'cherry-markdown',
            // 是否启用预览区域编辑能力（目前支持编辑图片尺寸、编辑表格内容）
            enablePreviewerBubble: !preview,
            floatWhenClosePreviewer: false,
            /**
             * 配置图片懒加载的逻辑
             * - 如果不希望图片懒加载，可配置成 lazyLoadImg = {noLoadImgNum: -1}
             * - 如果希望所有图片都无脑懒加载，可配置成 lazyLoadImg = {noLoadImgNum: 0, autoLoadImgNum: -1}
             * - 如果一共有15张图片，希望：
             *    1、前5张图片（1~5）直接加载；
             *    2、后5张图片（6~10）不论在不在视区内，都无脑懒加载；
             *    3、其他图片（11~15）在视区内时，进行懒加载；
             *    则配置应该为：lazyLoadImg = {noLoadImgNum: 5, autoLoadImgNum: 5}
             */
            lazyLoadImg: {
                // 加载图片时如果需要展示loading图，则配置loading图的地址
                loadingImgPath: '',
                // 同一时间最多有几个图片请求，最大同时加载6张图片
                maxNumPerTime: 2,
                // 不进行懒加载处理的图片数量，如果为0，即所有图片都进行懒加载处理， 如果设置为-1，则所有图片都不进行懒加载处理
                noLoadImgNum: 5,
                // 首次自动加载几张图片（不论图片是否滚动到视野内），autoLoadImgNum = -1 表示会自动加载完所有图片
                autoLoadImgNum: 5,
                // 针对加载失败的图片 或 beforeLoadOneImgCallback 返回false 的图片，最多尝试加载几次，为了防止死循环，最多5次。以图片的src为纬度统计重试次数
                maxTryTimesPerSrc: 2,
            },
        },
        /** 定义cherry缓存的作用范围，相同nameSpace的实例共享localStorage缓存 */
        nameSpace: id,
        themeSettings: {
            // 主题列表，用于切换主题
            themeList: [
                {className: 'default', label: '默认'},
                {className: 'dark', label: '暗黑'},
                {className: 'light', label: '明亮'},
                {className: 'green', label: '清新'},
                {className: 'red', label: '热情'},
                {className: 'violet', label: '淡雅'},
                {className: 'blue', label: '清幽'},
            ],
            mainTheme: mainTheme,
            codeBlockTheme: codeTheme,
            inlineCodeTheme: 'black', // red or black
            toolbarTheme: 'dark', // light or dark 优先级低于mainTheme
        },
        // 预览页面不需要绑定事件
        isPreviewOnly: preview,
        // 预览区域跟随编辑器光标自动滚动
        autoScrollByCursor: true,
        // 外层容器不存在时，是否强制输出到body上
        forceAppend: false,
        locale: 'zh_CN',
        // cherry初始化后是否检查 location.hash 尝试滚动到对应位置
        autoScrollByHashAfterInit: false,
    }
}
