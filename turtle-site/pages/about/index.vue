<script setup lang="ts">
import Markdown from "~/components/Markdown/index.vue";
const {data: aboutMe, status, error} = await useAsyncData(`aboutMe`, () => {
  return $fetch(`http://192.168.0.151:8000/api/v1/about-me`)
})

</script>
<template>
  <div class="w-full pt-2">
    <Markdown v-if="status='success'" md-id="10010" code-theme="dark"
              main-theme="default"
              anchor-style="none" :preview="false" :value="aboutMe.data"/>
  </div>
</template>
<style scoped>
:deep(.cherry-previewer) {
  border-left: none;
  padding: 0 15px 0 15px;
}
</style>
