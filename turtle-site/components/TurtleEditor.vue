<template>
  <ClientOnly>
    <div class="editor-root">
      <div id="markdown-container" style="height:95vh"/>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue'
import {process} from "std-env";

const emit = defineEmits(['markdown-change'])
const props = defineProps(['id', 'preview', 'value'])
const instance = ref<any>(null)
const isInitialized = ref(false)
const shouldRender = ref(false)


// 确保只在客户端执行一次初始化
const initEditor = async () => {
  if (instance.value || !process.client) return

  try {
    // 并行加载资源
    const [{default: Cherry}, _] = await Promise.all([
      import('cherry-markdown'),
      import('cherry-markdown/dist/cherry-markdown.css')
    ])
    // 检查容器是否存在
    // const container = document.getElementById('markdown-container')
    // if (!container) throw new Error('Container not found')

    // 销毁可能的残留实例
    if (instance.value?.destroy) instance.value.destroy()

    // 创建新实例
    instance.value = new Cherry({
      id: 'cherry-markdown',
      value: '# welcome to cherry editor!',

      // 必须配置 engine.global下防止重复加载
      engine: {
        global: {
          dependPlugins: []
        }
      },
      // 预览页面不需要绑定事件
      isPreviewOnly: false,
      // 预览区域跟随编辑器光标自动滚动
      autoScrollByCursor: true,
      // 外层容器不存在时，是否强制输出到body上
      forceAppend: false,
      locale: 'zh_CN',
      // cherry初始化后是否检查 location.hash 尝试滚动到对应位置
      autoScrollByHashAfterInit: false,
    })

    isInitialized.value = true
  } catch (error) {
    console.error('Editor init failed:', error)
  } finally {
    shouldRender.value = true
  }
}

onMounted(() => {

  // 延迟初始化避免水合冲突
  const timer = setTimeout(initEditor, 50)
  onBeforeUnmount(() => {
    clearTimeout(timer)
    if (instance.value?.destroy) {
      instance.value.destroy()
      instance.value = null
    }
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
