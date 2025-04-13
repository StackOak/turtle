<script setup lang="ts">
import CherryEditor from "~/components/CherryEditor/CherryEditor.vue";

const editorRef = ref()
const items = ref([
  {
    id: '1001',
    label: 'Turtle系统开发文档/',
    defaultExpanded: true,
    children: [
      {
        id: '1002',
        label: '快速入门/',
        children: [
          {
            id: 'auth',
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript',
            content: '# Authentication Hook\n\n```ts\nconst { login } = useAuth()\n```'
          },
          {
            id: 'user',
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript',
            content: '# User Management\n\n```ts\nconst { user } = useUser()\n```'
          }
        ]
      },
      {
        id: 'comp',
        label: '后端开发/',
        defaultExpanded: true,
        children: [
          {
            id: '接口规范',
            label: '接口规范',
            icon: 'i-vscode-icons-file-type-vue',
            content: '# Card Component\n\n```vue\n<template>\n  <div class="card">\n    <slot />\n  </div>\n</template>'
          },
          {
            id: 'button',
            label: '技术介绍',
            icon: 'i-vscode-icons-file-type-vue',
            content: '# Button Component\n\n```vue\n<template>\n  <button class="btn">\n    <slot />\n  </button>\n</template>'
          }
        ]
      }
    ]
  },
  {
    id: '',
    label: '介绍',
    icon: 'i-vscode-icons-file-type-vue',
    content: '# Main App\n\n```vue\n<template>\n  <NuxtPage />\n</template>'
  },
  {
    id: 'config',
    label: '环境要求',
    icon: 'i-vscode-icons-file-type-nuxt',
    content: '# Nuxt Config\n\n```ts\nexport default defineNuxtConfig({\n  modules: []\n})\n```'
  }
])

// 当前选中的菜单项
const selectedItem = ref()

// 编辑器内容
const content = ref('请从左侧菜单中选择文件')

// 查找菜单项对应的内容
const findItemContent = (id: string) => {
  return {id: id, content: id + 1}
}

// 监听菜单选择变化
watch(selectedItem, (newVal) => {
  if (newVal) {
    content.value = findItemContent(newVal)
    // 如果编辑器实例已创建，直接更新内容
    if (editorRef.value?.instance?.setValue) {
      editorRef.value.instance.setValue('```json\n' + JSON.stringify(content.value,null,2) + '\n```')
    }
  }
})
</script>

<template>
  <div class="flex flex-row">
    <!-- 左侧菜单 -->
    <div class="w-auto overflow-auto sticky top-0 self-start">
      <UTree
          v-model="selectedItem"
          :items="items"
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
