<script setup lang="ts">
import Markdown from "~/components/Markdown/index.vue";
import {ref, onMounted, onUnmounted} from 'vue';
import {API} from "~/constants/api";

definePageMeta({
  middleware: 'auth'
})
const toast = useToast();
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const openPublishModel = ref(false)
const maxLength = ref(100)
// 标题长度限制常量
const TITLE_LIMIT = {min: 2, max: 100}
//文章内容长度限制
const CONTENT_LIMIT = {min: 5, max: 10000}
const aid = ref(route.query.id)
const isAdd = computed(() => {
  return aid.value === undefined || aid.value === null || aid.value === ''
})
const articleForm = reactive({
  id: null,
  title: '',
  description: '',
  content: '',
  tagNames: '',
  status: '1',
  isProtected: false,
  accessPassword: ''
});
const inputPwd = ref([])

onMounted(() => {
  loadArticle()
})
const loadArticle = async () => {
  if (!isAdd.value) {
    try {
      loading.value = true
      const response = await Https.action(API.ARTICLE.get, {
        params: {
          id: aid.value
        }
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
  if (!validateTitle.value) {
    return
  }
  articleForm.status = '0'
  handleSubmit()
}
// 标题验证
const validateTitle = computed(() => {
  if (!articleForm.title?.trim()) {
    toast.add({title: '文章标题不能为空', color: 'warning'})
    return false
  }
  if (articleForm.title?.length < TITLE_LIMIT.min) {
    toast.add({
      title: `标题至少需要${TITLE_LIMIT.min}个字符`,
      color: 'warning'
    })
    return false
  }
  if (articleForm.title?.length > TITLE_LIMIT.max) {
    toast.add({
      title: `标题不能超过${TITLE_LIMIT.max}个字符`,
      color: 'warning'
    })
    return false
  }
  return true
})

// 内容验证
const validateContent = computed(() => {
  if (!articleForm.content?.trim()) {
    toast.add({title: '文章内容不能为空', color: 'warning'})
    return false
  }
  if (articleForm.content?.length < CONTENT_LIMIT.min) {
    toast.add({
      title: `内容至少需要${CONTENT_LIMIT.min}个字符`,
      color: 'warning'
    })
    return false
  }
  if (articleForm.content?.length > CONTENT_LIMIT.max) {
    toast.add({
      title: `内容不能超过${CONTENT_LIMIT.max}个字符`,
      color: 'warning'
    })
    return false
  }
  return true
})


const toPublish = () => {
  if (!validateTitle.value || !validateContent.value) return
  openPublishModel.value = true
}
// 提交表单
const handleSubmit = () => {
  if (articleForm.isProtected) {
    articleForm.accessPassword = inputPwd.value.join('')
  } else {
    delete articleForm.accessPassword // 如果不需要密码则移除属性
  }
  $fetch(`/api/article/save`, {
    method: 'post',
    body: articleForm
  }).then((res: any) => {
    if (res.data) {
      //跳转到一个成功界面
      toast.add({title: '保存成功', color: 'success'})
      router.push({path: `/detail/${res.data}`})
    } else {
      toast.add({title: res.msg, color: 'warning', duration: 0})
    }
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
  <UModal
      v-model:open="openPublishModel"
      title="文章发布"
      :overlay="false"
      :ui="{
           body: 'flex flex-col gap-4 w-full p-6',
           footer: 'flex justify-end gap-3 p-4'
      }">
    <template #body>
      <div class="grid grid-cols-1 gap-4 w-full">
        <UInput
            size="xl"
            variant="soft"
            v-model="articleForm.tagNames"
            placeholder="请输入标签（用分号[、]分隔）"
            class="w-full"
        />
        <UTextarea
            size="xl"
            variant="soft"
            v-model="articleForm.description"
            placeholder="请输入文章描述"
            class="w-full"
        />
        <UCheckbox :ui="{
          label:'block font-medium text-(--ui-text) pl-2'
        }" size="xl" label="密码保护" v-model="articleForm.isProtected"/>
        <UPinInput v-if="articleForm.isProtected" :autofocus="true" size="xl" :length="6" otp mask type="number"
                   v-model="inputPwd"/>
      </div>
    </template>
    <template #footer>
      <UButton label="取消" color="neutral" variant="outline" @click="openPublishModel = false"/>
      <UButton @click="onPublish" label="立即发布" color="neutral"/>
    </template>
  </UModal>
</template>
