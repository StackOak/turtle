<template>
  <ClientOnly>
    <div :id="mdId" :style="{ height: height + 'vh' }"/>
  </ClientOnly>
</template>
<script setup lang="ts">


import {ref, onMounted, onUnmounted} from "vue";


import {getConfig} from "./config";
import type {Cherry} from "cherry-markdown/types/cherry";


const emit = defineEmits(['markdown-change'])
const props = defineProps(['mdId', 'height', 'width', 'preview', 'value', 'float', 'codeTheme', 'mainTheme', 'anchorStyle'])
const cherryInstance = ref();
onMounted(() => {

  if (process.client) {
    import('cherry-markdown/dist/cherry-markdown.css')
    initCherryMD()
  }

});

onUnmounted(() => {
  // @ts-ignore
  cherryInstance.value.destroy()
})

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
