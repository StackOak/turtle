<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
    <div v-for="(item, index) in 10" :key="index" class="bg-white rounded-lg shadow p-4 cursor-pointer">
      <div class="flex flex-row gap-4">
        <!-- 封面图片 -->
        <div class="flex-shrink-0">
          <img class="h-[120px] w-[100px] object-cover rounded" src="/logo.jpeg" alt="封面">
        </div>
        <!-- 内容区域 -->
        <div class="flex flex-col flex-1 min-w-0">
          <h3 class="text-lg font-semibold truncate">java开发文档 {{ index + 1 }}</h3>
          <p class="text-gray-600 line-clamp-2 mt-1">
            一篇技术文档简短描述信息，超过一行长度自动显示三个点，这里是一段较长的描述文本用于测试截断效果。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
