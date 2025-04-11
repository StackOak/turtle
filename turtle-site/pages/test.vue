<template>
  <div style="padding: 0 20%">
    <!-- 客户端渲染 Markdown -->

    <!--      <div style="padding: 0 20%" id="markdown-container"></div>-->
    <Markdown  md-id="1001" code-theme="light" main-theme="default"
               anchor-style="none" :preview="false" :value="articleContent"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Markdown from '~/components/Markdown/index.vue'


// 定义文章内容变量
const articleContent = ref<string>('');
// 服务端和客户端共用的数据获取逻辑
// const { data, error } = await useFetch('http://192.168.0.151:9856/portal/article/detail', {
//   method: 'POST',
//   body: {
//     id: '1'
//   },
//   headers: {
//     'Content-Type': 'application/json',
//     'authorization': 'Bearer iPtnYYKuTmwq3iO8C6cOLTYzjHruGHOk2eeiMJxb1mcUhLN6WCbzITC5m7W9gZr7etMT1JnQIoaN9vIzuM2ECC72G2KMLYSOuZ32SBkfLuTKJpEE0LlIjQoqgfObLKxO'
//   }
// });

if (data.value&& data.value.data.articleInfo.content) {
  articleContent.value = data.value.data.articleInfo.content;
} else if (error.value) {
  console.error('获取文章详情失败:', error.value);
}
// 客户端初始化 Markdown
onMounted(() => {
  // if (process.client) {
  //   if (data.value&& data.value.data.articleInfo.content) {
  //     articleContent.value = data.value.data.articleInfo.content;
  //   } else if (error.value) {
  //     console.error('获取文章详情失败:', error.value);
  //   }
  //  /* import('cherry-markdown/dist/cherry-markdown.css');
  //   import('cherry-markdown').then(({ default: Cherry }) => {
  //      new Cherry({
  //       id: 'markdown-container',
  //       value: articleContent.value, // 使用服务端预加载的内容
  //       isPreviewOnly: true,
  //     });
  //     console.log('Cherry Markdown 初始化成功');
  //   }).catch(error => {
  //     console.error('Cherry Markdown 初始化失败:', error);
  //   });*/
  // }
});
</script>

<style scoped>
#markdown-container {
  width: 100%;
  min-height: 300px;
}
:deep(.cherry) {
  box-shadow: none;
  border: none;
  min-height: 0;
}

:deep(.cherry-previewer) {
  border-left: none;
  padding: 0 15px 0 15px;
}
</style>
