<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();
const aid = ref(route.params.id); //bookId
const editorRef = ref()
// 当前选中的菜单项
const selectedItem = ref()
const {data: bookItems} = await useFetch("/api/book/items", {
  query: {
    bookId: aid.value
  }
})

// 编辑器内容
const content = ref('请从左侧菜单中选择文件')
// 查找菜单项对应的内容
const findItemContent = (id: string) => {
  return {id: id, content: id + 1}
}
// 监听菜单选择变化
watch(selectedItem, (newVal) => {
  if (newVal) {
    //如果是目录则不处理
    if (!(newVal.children == null || newVal.children.le == 0)) return
    //@ts-ignore如果是非目录则请求服务端获取文档数据
    content.value = findItemContent(newVal)
    // 如果编辑器实例已创建，直接更新内容
    if (editorRef.value?.instance?.setValue) {
      editorRef.value.instance.setValue('```json\n' + JSON.stringify(content.value, null, 2) + '\n```')
    }
  }
})
</script>

<template>
  <div class="shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]">
    <ReBack class="pl-4" title="大数据开发"/>
  </div>
  <div class="flex flex-row pl-2">
    <!-- 左侧菜单 -->
    <div class="w-auto overflow-auto sticky top-0 self-start">
      <UTree
          v-model="selectedItem"
          :items="bookItems"
          size="xl"
      />
    </div>
    <USeparator orientation="vertical" class="h-auto min-h-screen"/>
    <!-- 右侧编辑器 -->
    <div class="flex-1 p-4">
      <CherryEditor
          ref="editorRef"
          v-model="content"
          code-theme="dark"
          main-theme="default"
          anchor-style="none"
          id="editor-main"
          :preview="true"
      />
    </div>
  </div>
</template>

<style scoped>

:deep(.cherry-previewer) {
  border-left: none;
  padding: 0;
}

:deep(.cherry-mask-code-block .expand-btn) {
  color: white;
  background-color: rgb(43, 43, 43);
}

:deep(.cherry-mask-code-block .expand-btn):hover {
  background-color: black;
}
</style>
