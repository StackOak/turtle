<template>
  <ClientOnly>
    <div class="editor-root">
      <div id="markdown-container" style="height:95vh"/>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {Callbacks} from "~/components/Markdown/callbacks";
const emit = defineEmits(['markdown-change'])
const props = defineProps({
  id: String,
  preview: Boolean,
  value: String
})

const instance = ref<any>(null)
const isInitialized = ref(false)

const initEditor = async () => {
  if (instance.value || typeof window === 'undefined') return

  try {
    // 动态导入 CherryMarkdown 及其样式
    const [{ default: Cherry }, _] = await Promise.all([
      import('cherry-markdown'),
      import('cherry-markdown/dist/cherry-markdown.css')
    ])

    if (instance.value?.destroy) instance.value.destroy()
    const callbacks = Callbacks(instance.value , emit); // 将 emit 传递到 callbacks 中
    instance.value = new Cherry({
      id: 'markdown-container', // 需要匹配模板中的容器ID
      value: props.value || '# welcome to cherry editor!',
      engine: {
        global: {
          dependPlugins: []
        }
      },
      isPreviewOnly: props.preview || false,
      autoScrollByCursor: true,
      forceAppend: false,
      locale: 'zh_CN',
      autoScrollByHashAfterInit: false,
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
    })

    isInitialized.value = true
  } catch (error) {
    console.error('Editor init failed:', error)
  }
}

onMounted(() => {
  const timer = setTimeout(initEditor, 50)

  onBeforeUnmount(() => {
    clearTimeout(timer)
    instance.value?.destroy?.()
    instance.value = null
  })
})
</script>

<style scoped>
:deep(.cherry) {
  box-shadow: none;
  border: none;
  min-height: 0;
}
</style>
