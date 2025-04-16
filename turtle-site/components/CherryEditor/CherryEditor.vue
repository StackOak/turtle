<template>
  <ClientOnly>
    <div class="editor-root">
      <div :id="id" :style="{height:height+'vh',width:width+'wh'}"/>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue'
import {getConfig} from "~/components/CherryEditor/config";

const emit = defineEmits(['markdown-change','update:modelValue'])
const props = defineProps({
  id: String,
  preview: Boolean,
  value: String,
  float: Boolean,
  codeTheme: '',
  mainTheme: 'default',
  anchorStyle: '',
  height: Number,
  width: Number
})

const instance = ref<any>(null)
const isInitialized = ref(false)

const initEditor = async () => {
  if (instance.value || typeof window === 'undefined') return

  try {
    // 动态导入 CherryMarkdown 及其样式
    const [{default: Cherry}, _] = await Promise.all([
      import('cherry-markdown'),
      import('cherry-markdown/dist/cherry-markdown.css')
    ])
    if (instance.value?.destroy) instance.value.destroy()
    //@ts-ignore
    instance.value = new Cherry(getConfig({
      id: props.id,
      value: props.value,
      preview: props.preview,
      float: props.float,
      codeTheme: props.codeTheme,
      mainTheme: props.mainTheme,
      anchorStyle: props.anchorStyle,
      emit: emit
    }))

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
defineExpose({instance})
</script>

<style scoped>
:deep(.cherry) {
  box-shadow: none;
  border: none;
  min-height: 0;
}
</style>
