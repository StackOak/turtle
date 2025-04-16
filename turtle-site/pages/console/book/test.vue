<script setup lang="ts">
import type {DropdownMenuItem} from "#ui/components/DropdownMenu.vue";
import {ref} from "vue";
const content = ref('')/*编辑器内容*/
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
    icon: 'i-material-symbols-markdown-rounded'
  },
  {
    label: '新增目录',
    icon: 'i-material-symbols-folder-rounded'
  },
  {
    label: '重命名',
    icon: 'i-material-symbols-folder-rounded'
  },
  {
    label: '删除文档',
    icon: 'i-material-symbols-delete-rounded'
  },
])

</script>

<template>
  <div class="flex flex-row min-h-[calc(100vh-64px)] pl-3 ">
    <!-- 侧边栏 -->
    <div class="w-[250px] pt-8 flex flex-col gap-4">
      <!-- 标题 -->
      <div class="text-lg font-semibold text-gray-800 pl-4 pt-4">
        大数据开发
      </div>

      <!-- 目录和操作 -->
      <div class="flex flex-row justify-between items-center px-4">
        <span class="text-sm font-medium text-gray-600">目录</span>
        <UDropdownMenu :items="items2" trigger="hover" placement="bottom-end">
          <UButton variant="ghost" size="sm" class="p-1">
            <UIcon name="i-famicons-add-sharp" class="w-5 h-5 text-gray-500" />
          </UButton>
        </UDropdownMenu>
      </div>

      <!-- 树形菜单 -->
      <div class="px-2">
        <UTree
            size="lg"
            multiple
            :items="items"
            class="min-w-[200px]"
        />
      </div>
    </div>

    <!-- 分割线 -->
    <USeparator orientation="vertical" class="h-auto bg-gray-200" />
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
