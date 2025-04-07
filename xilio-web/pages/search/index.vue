<script setup lang="ts">
const searchKey = ref('hello world')
const onSearch = () => {

}
</script>

<template>
  <div class="w-full pt-2">
    <UInput @keydown.enter="onSearch" v-model:model-value="searchKey" class="w-full" icon="i-lucide-search" size="xl"
            variant="soft" placeholder="请输入关键字检索"/>
  </div>
</template>

<style scoped>

</style>
