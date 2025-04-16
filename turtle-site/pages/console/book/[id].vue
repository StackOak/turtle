<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";
import type {DropdownMenuItem} from "#ui/components/DropdownMenu.vue";

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

const items = ref([
  {
    label: '高并发系统设计方案',
    defaultExpanded: true,
    children: [
      {
        label: '消息队列生产问题',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript'
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript'
          }
        ]
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            icon: 'i-vscode-icons-file-type-vue'
          },
          {
            label: 'Button.vue',
            icon: 'i-vscode-icons-file-type-vue'
          }
        ]
      }
    ]
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue'
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt'
  }
])
const items2 = ref<DropdownMenuItem[]>([
  {
    label: '新增文档',
    icon: 'i-material-symbols-markdown-rounded',
    onSelect(e: Event) {

      // 添加一个新的文档节点
      const newItem = {
        id: `new-${Date.now()}`, // 临时生成唯一 ID
        label: '新建文档',
        icon: 'i-material-symbols-markdown-rounded',
        children: [], // 确保新节点是叶子节点
      };
      bookItems.value = [...bookItems.value,
        {label: `new-${Date.now()}`, icon: 'i-material-symbols-markdown-outline-sharp', children: []}]

    }
  },
  {
    label: '新增目录',
    icon: 'i-material-symbols-folder-rounded',
    onSelect(e: Event) {
      // 添加一个新的文档节点
      const newItem = {
        id: `new-${Date.now()}`, // 临时生成唯一 ID
        label: '新建文档',
        icon: 'i-material-symbols-markdown-rounded',
        children: [], // 确保新节点是叶子节点
      };
      bookItems.value = [...bookItems.value,
        {label: `new-${Date.now()}`, icon: 'i-akar-icons-folder', children: []}]

    }
  },
  {
    label: '重命名',
    icon: 'i-material-symbols-folder-rounded',
    onSelect(e: Event) {


    }
  },
  {
    label: '删除节点',
    icon: 'i-material-symbols-delete-rounded',
    onSelect(e: Event) {


    }
  },
])

</script>

<template>
  <div class="shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]  z-500">
    <ReBack class="pl-4" title=" 大数据开发"/>
  </div>
  <div class="flex flex-row pl-2 h-[calc(100vh-64px)] fixed">
    <!-- 左侧菜单 -->
    <div class="w-auto max-w-xs z-10 overflow-y-auto max-h-[calc(100vh-64px)]">
      <!-- 侧边栏 -->
      <div class="w-[250px] pt-3 flex flex-col gap-4">
        <!-- 目录和操作 -->
        <div class="flex flex-row justify-between items-center px-4">
          <span class="text-sm font-medium text-gray-600">目录</span>
          <UDropdownMenu :items="items2" trigger="hover" placement="bottom-end">
            <UButton variant="ghost" size="sm" class="p-1">
              <UIcon name="i-ci-more-grid-big" class="w-5 h-5 text-gray-500"/>
            </UButton>
          </UDropdownMenu>
        </div>
        <!-- 树形菜单 -->
        <div class="px-2">
          <UTree
              :ui="{link:'cursor-pointer'}"
              v-model="selectedItem"
              v-model:items="bookItems"
              size="xl"
              class="min-w-[200px]"
          />
        </div>
      </div>
    </div>
    <USeparator orientation="vertical" class="h-auto min-h-[calc(100vh-64px)]"/>
    <!-- 右侧编辑器 -->
    <div class="flex-1   max-h-[calc(100vh-64px)]">
      <CherryEditor
          ref="editorRef"
          :height="95"
          v-model="content"
          code-theme="dark"
          main-theme="default"
          anchor-style="none"
          id="editor-main"
          :preview="false"
      />
    </div>
  </div>
</template>

<style scoped>
/* 确保左右区域独立滚动 */
.flex-row {
  overscroll-behavior: contain; /* 防止滚动穿透 */
}
</style>
