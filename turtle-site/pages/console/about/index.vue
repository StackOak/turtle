<script setup lang="ts">
import {Https} from "~/composables/https";
import {API} from "~/constants/api";
import {process} from "std-env";
import {debounce} from "@antfu/utils";

const toast = useToast();
const {data: aboutRes, status, error} = await useAsyncData(`aboutMe`, () => {
  return $fetch(`http://192.168.0.151:8000/api/v1/about-me`)
})
const aboutMe = ref(aboutRes.value?.data || '')
const debouncedSearch = debounce(500, async (value:string) => {
  await updateProfile(value)
})
const onMarkdownChange = (e: any) => {
  if (process.client) {
    //aboutMe.content = e.content
    debouncedSearch(e.content)
  }
}
const updateProfile = async (value:string) => {
  Https.action(API.USER.updateProfile, {
    body: {
      aboutMe: value
    }
  }).then(res => {
    toast.add({title: '更新成功', color: 'success'});
  })
}
</script>

<template>
  <ClientOnly>
    <Markdown
        ref="markdownRef"
        float="true"
        main-theme="default"
        :height="95"
        :md-id="53210"
        :preview="true"
        @markdownChange="onMarkdownChange"
        :value="aboutMe"
        class="w-full"
    />
  </ClientOnly>
</template>

<style scoped>

</style>
