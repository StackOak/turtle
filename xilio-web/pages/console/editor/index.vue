<script setup lang="ts">
const content = ref('')
const onMarkdownChange = () => {

}
</script>

<template>
  <n-flex justify="flex-end" :gap="10">

    <u-button color="neutral" size="xl">
      发布
    </u-button>
  </n-flex>
  <Markdown float="true" main-theme="default" @markdown-change="onMarkdownChange" :height="95" :md-id="10086"
            :preview="true"
            :value="content"/>

</template>

<style scoped>

</style>
