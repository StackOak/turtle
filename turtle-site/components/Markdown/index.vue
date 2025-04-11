<template>
  <ClientOnly>
    <div :id="mdId" :style="{ height: height + 'vh' }"/>
  </ClientOnly>
</template>
<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue";
import {getConfig} from "./config";
const emit = defineEmits(['markdown-change'])
const props = defineProps(['mdId', 'height', 'width', 'preview', 'value', 'float', 'codeTheme', 'mainTheme', 'anchorStyle'])
const cherryInstance = ref(null);
onMounted(() => {
  // 确保 DOM 元素存在且未初始化
  if (!cherryInstance.value ) {
      if (process.client) {
        import('cherry-markdown/dist/cherry-markdown.css')
        initCherryMD()
      }
    }
});


onUnmounted(() => {
  if (cherryInstance.value) {
    try {
      cherryInstance.value.destroy();
      cherryInstance.value = null; // 重置实例
    } catch (error) {
      console.error('Failed to destroy Cherry:', error);
    }
  }
});


//@ts-nocheck
const initCherryMD = () => {
  import('cherry-markdown').then(({default: Cherry}) => {
    cherryInstance.value = new Cherry(getConfig({
      id: props.mdId,
      value: props.value,
      preview: !props.preview,
      float: props.float,
      codeTheme: props.codeTheme,
      mainTheme: props.mainTheme,
      anchorStyle: props.anchorStyle,
      cherryInstance: cherryInstance,
      emit: emit
    }))
  })
}


</script>
<style scoped>
:deep(.cherry) {
  box-shadow: none;
  border: none;
  min-height: 0;
}
</style>
