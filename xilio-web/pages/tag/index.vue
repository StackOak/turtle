<script setup lang="ts">
const {data: tags, status} = await useFetch('http://localhost:8000/api/v1/tags?page=1&size=100')

</script>

<template>

  <div class="w-full">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(70px,auto))] gap-4 pt-4">
      <UBadge
          class="flex justify-center"
          v-for="(tag, index) in tags.data.data"
          :key="index"
          color="neutral"
          variant="soft"
      >
        <UTooltip :delay-duration="1" arrow :content="{align: 'center',side: 'top'}" :text="tag.name">
          <NuxtLink :to="`/tag/${tag.name}`" class="block text-center truncate">
            {{ tag.name }}
          </NuxtLink>
        </UTooltip>
      </UBadge>
    </div>
  </div>

</template>

<style scoped>

</style>
