<script setup lang="ts">
import Markdown from "~/components/Markdown/index.vue";
import {ref, onMounted, onUnmounted} from 'vue';


definePageMeta({
  middleware: 'auth'
})
const toast = useToast();
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const openPublishModel = ref(false)
const maxLength = ref(100)

const aid = ref(route.query.id)
const isAdd = computed(() => {
  return aid.value === undefined || aid.value === null || aid.value === ''
})

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
const onPublish = () => {
  articleForm.status = '1'
  handleSubmit()
}
const onSaveToDraft = () => {
  if (!validTitle.value) {
    return
  }
  articleForm.status = '0'
  handleSubmit()
}
const validTitle = computed(() => {
  if (articleForm.title == null) {
    toast.add({title: '请输入标题', color: 'warning'})
    return false
  }
  if (articleForm.title?.length < 3 || articleForm.title?.length > maxLength.value) {
    toast.add({title: `标题字数在3-${maxLength.value}范围内`, color: 'warning'})
    return false
  }
  return true
})
const toPublish = () => {
  if (!validTitle.value) {
    return
  }
  openPublishModel.value = true
}
// 提交表单
const handleSubmit = () => {
  $fetch(`/api/article/save`, {
    method: 'post',
    body: articleForm
  }).then(res => {
    //跳转到一个成功界面
    toast.add({title: '保存成功', color: 'success'})
    router.push({path: `/detail/${res.data}`})
  });
};

defineShortcuts({
  o: () => openPublishModel.value = !openPublishModel.value
})
</script>

<template>
  <div class="flex flex-col w-full gap-2 pt-2 fixed">
    <div class="flex flex-row justify-between items-center w-full pl-4 pr-15">
      <div class="flex-1 min-w-0 pr-10">
        <UInput
            v-model="articleForm.title"
            :maxlength="maxLength"
            size="xl"
            variant="soft"
            class="w-full"
            placeholder="输入一个简短的标题"
            aria-describedby="character-count"
            :ui="{ trailing: 'pointer-events-none' }">
          <template #trailing>
            <div
                id="character-count"
                class="text-xs text-(--ui-text-muted) tabular-nums"
                aria-live="polite"
                role="status">
              {{ articleForm.title?.length }}/{{ maxLength }}
            </div>
          </template>
        </UInput>
      </div>
      <div class="flex items-center gap-4">
        <UButton color="info" @click="onSaveToDraft">保存草稿</UButton>
        <UButton @click="toPublish">发布</UButton>
      </div>
    </div>
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
  <!-- 文章发布对话框 -->
  <div>
    <UModal v-model:open="openPublishModel" title="文章发布" :overlay="false">
      <template #body>
        <!-- 标签 -->
        <div class="flex flex-col gap-2 justify-start">
          <UInput v-model="articleForm.tagNames" placeholder="请输入标签（用分号分隔）" class="w-[40%] px-8"/>
          <UTextarea v-model="articleForm.description" placeholder="请输入文章描述" class="w-[60%] px-8"/>
        </div>
      </template>
      <template #footer>
        <UButton label="取消" color="neutral" variant="outline" @click="openPublishModel = false"/>
        <UButton @click="onPublish" label="立即发布" color="neutral"/>
      </template>
    </UModal>
  </div>
</template>
