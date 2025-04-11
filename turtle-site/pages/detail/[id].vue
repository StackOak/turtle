<script setup lang="ts">
import Markdown from '@/components/Markdown/index.vue';
import {ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import ReBack from "~/components/ReBack.vue";

const route = useRoute();
const router = useRouter();

const aid = ref(route.params.id); // 初始化 aid
const accessPassword = ref([])
const isLoading = ref(false)
const isPasswordCorrect = ref(false)
const errorMessage = ref('')
const isProtected = ref(route.query.p === '1') // 先检查URL参数
const {data: articleRes, status, error} = await useAsyncData(`article-${aid}`, () => {
  // 如果是密码保护文章，直接返回null，不发起请求
  if (isProtected.value) return Promise.resolve(null)
  return $fetch(`http://localhost:8000/api/v1/detail?id=${aid.value}`)
}, {
  // 只有当不是密码保护文章时才执行
  watch: [isProtected]
})
const article = ref<any>(articleRes.value?.data || <any>{})


//@ts-ignore
// 如果不是通过p=1判断的密码文章，再检查API返回状态
if (!isProtected.value && articleRes.value?.code === 401) {
  isProtected.value = true
} else if (!isProtected.value) {
  article.value = articleRes.value?.data || {}
}
// 密码验证函数
const verifyVisit = async () => {
  const pwd = accessPassword.value.join('')
  if (!pwd || pwd.length < 6) {
    errorMessage.value = '请输入6位密码'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const {data: verifyRes} = await useAsyncData(`article-${aid}-protected`, () => {
      return $fetch(`http://localhost:8000/api/v1/detail?id=${aid.value}&pwd=${pwd}`)
    })
    if (verifyRes.value.data?.code === 200) {
      isPasswordCorrect.value = true
      isProtected.value = false
      // 密码验证成功后获取文章内容
      article.value = verifyRes.data?.data || {}
    } else {
      errorMessage.value = verifyRes.value?.message || '访问失败，请重试'
      accessPassword.value = []
    }
  } catch (err) {
    errorMessage.value = '验证失败，请稍后再试'
    console.error('密码验证错误:', err)
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <div class="min-h-screen pb-20 w-full">
    <ReBack>文章</ReBack>
    <div class="pb-2 text-2xl font-bold font-sans text-gray-700">{{ article.title }}</div>
    <div class="flex flex-row justify-between items-center pb-2">
      <span v-if="article" class="text-gray-500">{{ article.publishedAt }}</span>
      <NuxtLink v-if="true" :to="`/console/editor?id=${article.id}`">
        <span class="text-gray-800 cursor-pointer"> 编辑</span>
      </NuxtLink>
    </div>
    <div v-if="article&&!isProtected">
      <Markdown
          v-if="article.content"
          ref="markdownRef"
          :md-id="53211"
          code-theme="dark"
          main-theme="default"
          anchor-style="none"
          :preview="false"
          :value="article.content"/>
      <div class="flex flex-row items-center gap-3 pt-4">
        <span>标签：</span>
        <div class="flex flex-row gap-4 items-center">
          <NuxtLink :to='`/tag/${tagName}`' v-for="tagName in article.tags" :key="tagName">
            <UBadge color="neutral" variant="soft" class="truncate">
              {{ tagName }}
            </UBadge>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class=" text-gray-500 pt-[10%] flex gap-6 flex-col items-center justify-center ">
      <UIcon name="i-turtle-passport" class="size-20"/>
      <div class="flex flex-col items-center gap-5 max-w-xs justify-center">
        <UPinInput size="xl" :length="6" otp mask type="number" v-model="accessPassword"/>
        <UButton @click="verifyVisit" class="w-full flex justify-center items-center " size="xl">立即访问</UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.cherry-previewer) {
  border-left: none;
  padding: 0;
}
</style>
