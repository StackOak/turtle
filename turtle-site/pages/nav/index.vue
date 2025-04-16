<script setup lang="ts">
const {data: navLinks} = await useFetch("/api/link/nav-links");
</script>

<template>
  <div class="w-full max-w-7xl mx-auto">
    <!-- 网站列表 -->
    <div v-for="cate in navLinks" :key="cate.id" class="mb-8">
      <h2 v-if="cate.links.length>0" class="text-xl font-bold text-gray-700 bg-gray-100 rounded">{{ cate.name }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-2 ">
        <nuxt-link
            v-for="link in cate.links"
            :key="link.id"
            :to="link.url"
            target="_blank"
            class="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex flex-row gap-4">
            <!-- Logo图片 -->
            <div class="flex-shrink-0">
              <img
                  class="h-12 w-12 object-cover rounded-full"
                  :src="link.logo"
                  :alt="link.title"
              />
            </div>
            <!-- 内容区域 -->
            <div class="flex flex-col flex-1 min-w-0">
              <h3 class="text-base font-semibold text-gray-900 truncate">
                {{ link.title }}
              </h3>
              <p class="text-sm text-gray-500 line-clamp-1 mt-1">
                {{ link.description }}
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
