<script setup lang="ts">
const tags = ref(['java', 'c++', 'python', 'javascript', 'go', 'java', 'c++', 'python', 'javascript', 'go', 'java', 'c++', 'python', 'javascript', 'go', 'rust', 'kotlin', 'swift'])

</script>

<template>
  <div>
    <div class="w-full pt-4 ">
      <UBadge
          class="tag-item"
          v-for="(tag, index) in tags"
          :key="index"
          color="neutral"
          variant="soft">
        <NuxtLink :to="`/tag/${tag}`">
          {{ tag }}
        </NuxtLink>
      </UBadge>
    </div>
  </div>
</template>

<style scoped>
.tag-item {
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.tag-item:hover {
  color: #000;

}

.tag-item:last-child {
  margin-right: 0;
  margin-bottom: 0
}
</style>
