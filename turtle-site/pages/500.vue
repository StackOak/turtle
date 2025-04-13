<template>
  <div>
    <CherryEditor
        :value="initialContent"
        :preview="true"
        @markdown-change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
const initialContent = ref('# Hello Nuxt 3!')

const handleChange = (newContent: string) => {
  console.log('Content changed:', newContent)
}
</script>
