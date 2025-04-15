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
const content = ref('')
const fetchItemData = async (itemId: string) => {
  const res = await $fetch("/api/book/item-content", {
    query: {itemId: itemId}
  })
  content.value = res
}

// 监听菜单选择变化
watch(selectedItem, (newItem) => {
  if (newItem) {
    //如果是目录则不处理
    if (!(newItem.children == null || newItem.children.length == 0)) return
    //如果是非目录则请求服务端获取文档数据
    fetchItemData(newItem.id)
    if (editorRef.value?.instance?.setValue) {
      editorRef.value.instance.setValue(content.value)
    }
  }
})
</script>

<template>
  <div class="shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)] sticky top-0 self-start z-500">
    <ReBack class="pl-4" title="大数据开发"/>
  </div>
  <div class="flex flex-row pl-2 h-[calc(100vh-64px)]">
    <!-- 左侧菜单 -->
    <div class="w-auto max-w-xs z-10 overflow-y-auto max-h-[calc(100vh-64px)]">
      <UTree
          v-model="selectedItem"
          :items="bookItems"
          size="xl"
          class="min-w-[200px]"
      />
    </div>
    <USeparator orientation="vertical" class="h-auto min-h-[calc(100vh-64px)]"/>
    <!-- 右侧编辑器 -->
    <div class="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
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
/* 确保左右区域独立滚动 */
.flex-row {
  overscroll-behavior: contain; /* 防止滚动穿透 */
}
</style>
