<script setup lang="ts">
import CherryEditor from "~/components/CherryEditor/CherryEditor.vue";
const {data: aboutMe, status, error} = await useAsyncData(`aboutMe`, () => {
  return $fetch(`/api/user/about-me`)
} )
</script>
<template>
  <div class="w-full pt-2">
    <CherryEditor
        code-theme="dark"
        main-theme="default"
        anchor-style="none"
        v-if="status='success'"
        id="2048"
        :value="aboutMe"
        :preview="true"/>
  </div>
</template>
<style scoped>
:deep(.cherry-previewer) {
  border-left: none;
  padding: 0 15px 0 15px;
}
</style>
