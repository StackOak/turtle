<script setup lang="ts">
const router = useRouter()
const searchKey = ref('hello world')
const onSearch = () => {

}
</script>

<template>
  <div class="w-full pt-2">
    <UInput @keydown.enter="onSearch" v-model:model-value="searchKey" class="w-full" icon="i-lucide-search" size="xl"
            variant="soft" placeholder="请输入关键字检索"/>

    <div>
      <div v-for="i in 10">
        <NuxtLink :to="`/detail/${i}`" class="flex flex-row justify-between items-center   cursor-pointer">
          {{ i }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
