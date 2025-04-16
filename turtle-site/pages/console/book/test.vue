<script setup lang="ts">
import type {DropdownMenuItem} from "#ui/components/DropdownMenu.vue";

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
    label: '删除文档',
    icon: 'i-material-symbols-delete-rounded'
  },
])

</script>

<template>
  <div class="flex flex-row pl-3 h-[calc(100vh-64px)] ">

    <div class="w-[250px]">
      <div>
        大数据开发
      </div>
      <div class="flex justify-between pr-8  items-center">
        <div>目录</div>
        <div>
          <UDropdownMenu :items="items2">
            <UIcon :size="25" name="i-famicons-add-sharp"/>
          </UDropdownMenu>
        </div>
      </div>
      <UTree size="xl" class="min-w-[200px]" multiple :items="items"/>
    </div>

    <USeparator orientation="vertical" class="h-auto min-h-[calc(100vh-64px)]"/>
  </div>
</template>
