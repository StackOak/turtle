<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})

</script>

<template>
  <NuxtLink to="/console/editor">
    <u-button color="neutral" size="xl">
      写文章
    </u-button>
  </NuxtLink>
</template>
