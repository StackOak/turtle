<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';

const markdownRef = ref();
const articleForm = reactive({
  id:'',
  title: '',
  description: '',
  tags: '', // 新增 tags 字段
  content: '',
});

// 提交表单
const handleSubmit = () => {
  console.log('提交文章:', articleForm);

};
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


      <UInput  v-model="articleForm.tags" placeholder="请输入标签（用分号分隔）" class="w-[40%] px-8"/>
      <UTextarea  v-model="articleForm.tags" placeholder="请输入文章描述" class="w-[60%] px-8"/>

    <!-- Markdown 编辑器 -->
    <div class="flex flex-col gap-2">
      <ClientOnly>
        <Markdown
            ref="markdownRef"
            float="true"
            main-theme="default"
            :height="95"
            :md-id="100086"
            :preview="true"
            :value="articleForm.content"
            @update:value="articleForm.content = $event"
            class="w-full"
        />
      </ClientOnly>
    </div>

  </div>
</template>


