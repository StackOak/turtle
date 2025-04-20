<template>
  <footer class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4 px-4">
    <div class="container mx-auto max-w-6xl">
      <div class="border-gray-200 dark:border-gray-700  text-sm text-center">
        <p v-if="copyright" class="mb-2">{{ copyright }}</p>
        <div class="flex justify-center space-x-4 gap-2">
          <a v-if="icp_link" :href="icp_link" target="_blank"
             class="hover:text-blue-600 dark:hover:text-blue-400 transition">{{ icp_number }}</a>
          <div v-if="police_record_link" class="flex flex-row gap-1 items-center">
            <img class="w-4 h-4" src="/police.png" alt="公安备案">
            <a :href="police_record_link" target="_blank"
               class="hover:text-blue-600 dark:hover:text-blue-400 transition">{{ police_record }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 从props接收配置信息，提供默认值
const props = defineProps({
  icp_link: {
    type: String,
    default: "http://icp.example.com"
  },
  copyright: {
    type: String,
    default: "© 2025 网站名字"
  },
  icp_number: {
    type: String,
    default: "ICP证123456"
  },
  police_record: {
    type: String,
    default: "公安备案号123"
  },
  police_record_link: {
    type: String,
    default: "http://police.example.com"
  }
})
</script>
