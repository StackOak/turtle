<script setup lang="ts">
import Markdown from "~/components/Markdown/index.vue";
import {ref, onMounted, onUnmounted} from 'vue';
import {process} from "std-env";

definePageMeta({
  middleware: 'auth'
})
const toast = useToast();
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const aid = ref(route.query.id)
const isAdd = computed(() => {
  return aid.value === undefined || aid.value === null || aid.value === ''
})
const markdownRef2 = ref();
const articleForm = reactive({
  id: null,
  title: null,
  description: null,
  tagNames: '',
  content: null,
  status: '1'
});
onMounted(() => {
  loadArticle()
})
const loadArticle = async () => {
  if (!isAdd.value) {
    try {
      loading.value = true
      const response = await $fetch(`/api/article/get?id=${aid.value}`, {
        method: 'get',
      });
      Object.assign(articleForm, response.data)
      articleForm.status = String(articleForm.status)
    } finally {
      loading.value = false
    }
  }
}
const onMarkdownChange = (e: any) => {
  articleForm.content = e.content
}
// 提交表单
const handleSubmit = () => {
  $fetch(`/api/article/save`, {
    method: 'post',
    body: articleForm
  }).then(res => {
    toast.add({title: '保存成功', color: 'success'})
    router.push({path: `/detail/${res.data}`})
  });
};
const isClient=computed(()=>{
  return process.client
})
</script>

<template>
  <div class="flex flex-col gap-2  w-full pt-2">
    <!-- 标题 -->
    <div class="flex flex-row gap-2 justify-between px-8  w-full">
      <UInput class="w-[60%]" v-model="articleForm.title" placeholder="请输入文章标题"/>
      <UButton color="neutral" size="xl" @click="handleSubmit">
        发布
      </UButton>
    </div>
    <!-- 标签 -->
    <UInput v-model="articleForm.tagNames" placeholder="请输入标签（用分号分隔）" class="w-[40%] px-8"/>
    <UTextarea v-model="articleForm.description" placeholder="请输入文章描述" class="w-[60%] px-8"/>
    <URadioGroup orientation="horizontal" variant="list" v-model:model-value="articleForm.status"
                 :items="[{value:'0',label:'草稿'},{value:'1',label:'发布'}]"/>
    <!-- Markdown 编辑器 -->
    <div class="flex flex-col gap-2">

      <Markdown
          v-if="!loading"
          ref="markdownRef"
          float="true"
          main-theme="default"
          :height="95"
          :md-id="532100"
          :preview="true"
          @markdownChange="onMarkdownChange"
          :value="articleForm.content"
          class="w-full"
      />

    </div>

  </div>
</template>


