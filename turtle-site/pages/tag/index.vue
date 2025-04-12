<script setup lang="ts">
const {data: tags, status} = await useFetch('/api/tag/list', {
  query: {
    page: 1,
    size: 100
  },
  server: true,
  lazy: false
})
</script>
<template>
  <div class="w-full">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(70px,auto))] gap-4 pt-4">
      <NuxtLink v-for="(tag, index) in tags.data"
                :key="index" :to="`/tag/${tag.name}`">
        <UTooltip :delay-duration="800" :content="{align: 'center'}" :text="tag.name">
          <UBadge
              class="flex justify-center"
              color="neutral"
              variant="soft">
          <span class="block text-center truncate">
            {{ tag.name }}
          </span>
          </UBadge>
        </UTooltip>
      </NuxtLink>
    </div>
  </div>
</template>
