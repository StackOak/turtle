<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const tagName = ref(route.params.tag)
const oneClickBack = () => {
  router.back()
}
</script>

<template>
  <div>
    <div class="flex flex-row items-center">
      <div @click="oneClickBack" class="flex items-center cursor-pointer
 justify-center w-9 h-9 rounded-full hover:bg-gray-200 hover:shadow-lg transition-all duration-300">
        <UIcon name="ep:back" class="size-8 text-gray-500"/>
      </div>
      <div>{{ tagName }}</div>
    </div>
    <div>
      <NuxtLink :to="`/detail/${i}`" v-for="i in 20" class="flex flex-row gap-4">
        {{ i }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
