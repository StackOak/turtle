<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col gap-4 w-full pt-4">
    <div v-for="i in 10" class="flex justify-between w-full p-4 bg-gray-100 rounded">
      <div>
        我的第 {{ i }} 篇博客文章
      </div>
      <div class="flex gap-2">
        <ULink class="text-blue-500 hover:underline">编辑</ULink>
        <ULink class="text-red-500 hover:underline">删除</ULink>
      </div>
    </div>
  </div>

</template>
