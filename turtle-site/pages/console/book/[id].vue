<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";
import type { ContextMenuItem } from '@nuxt/ui'

const items = ref<ContextMenuItem[]>([
  {
    label: 'System',
    icon: 'i-lucide-monitor'
  },
  {
    label: 'Light',
    icon: 'i-lucide-sun'
  },
  {
    label: 'Dark',
    icon: 'i-lucide-moon'
  }
])


const route = useRoute();
const aid = ref(route.params.id); /*知识库ID*/
const editorRef = ref()
const content = ref('')/*编辑器内容*/
const selectedItem = ref()/*当前选中的菜单项*/
//获取所有的知识库大纲
const {data: bookItems} = await useFetch("/api/book/items", {
  query: {
    bookId: aid.value
  },
  default: () => []
})
//获取知识库节点内容
const fetchItemData = async (itemId: string) => {
  try {
    const res = await $fetch("/api/book/item-content", {
      query: {itemId: itemId}
    })
    content.value = res || ''
    if (editorRef.value?.instance?.setValue) {
      editorRef.value.instance.setValue(content.value)
    }
  } catch (err) {
    if (editorRef.value?.instance?.setValue) {
      editorRef.value.instance.setValue('')
    }
  }
}

// 监听选择节点变化
watch(selectedItem, async (newItem) => {
  if (newItem) {
    //如果是目录则不处理
    if (newItem && newItem.children == null || newItem.children.length == 0) {
      //如果是非目录则请求服务端获取文档数据
      await fetchItemData(selectedItem.value.id)
    }
  }
})
</script>

<template>
  <div class="shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)] sticky top-0 self-start z-500">
    <ReBack class="pl-4" title="返回"/>
  </div>
  <div v-if="false" class="flex flex-row pl-2 h-[calc(100vh-64px)]">
    <!-- 左侧菜单 -->
    <div class="w-auto max-w-xs z-10 overflow-y-auto max-h-[calc(100vh-64px)]">
      <UTree
          :ui="{link:'cursor-pointer'}"
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




    <UContextMenu
        size="xl"
        :items="items"
        :ui="{
      content: 'w-48'
    }"
    >
      <div
          class="flex items-center justify-center rounded-md border border-dashed border-(--ui-border-accented) text-sm aspect-video w-72"
      >
        Right click here
      </div>
    </UContextMenu>


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
