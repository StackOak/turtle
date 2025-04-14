<script setup lang="ts">
import {Https} from "~/composables/https";
import {API} from "~/composables/api";
import {process} from "std-env";
import {debounce} from "@antfu/utils";
import CherryEditor from "~/components/CherryEditor/CherryEditor.vue";

definePageMeta({
  middleware: 'auth'
})
const toast = useToast();
const {data: aboutRes, status, error} = await useAsyncData(`aboutMe`, () => {
  return $fetch(`/api/user/about-me`)
})

const aboutMe = ref(aboutRes.value || '')
const debouncedSearch = debounce(1200, async (value: string) => {
  await updateProfile(value)
})
//监听编辑器内容的变化并更新数据
const onMarkdownChange = (e: any) => {
  if (process.client) {
    debouncedSearch(e.content)
  }
}
//更新配置信息
const updateProfile = async (value: string) => {
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
    <div>
      <CherryEditor
          code-theme="dark"
          main-theme="default"
          anchor-style="none"
          v-if="status='success'"
          :id="'2048'"
          :value="aboutMe"
          @markdownChange="onMarkdownChange"
          class="w-full"
          :height="95"
          :preview="false"/>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>
