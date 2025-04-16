<script setup lang="ts">
import {Https} from "~/composables/https";
import {API} from "~/composables/api";

const logout = async () => {
  try {
    await Https.action(API.USER.logout, {method: 'POST'})
    useCookie("Authorization").value = null
    await useRouter().push({path: '/'})
  } finally {
    useCookie("Authorization").value = null
  }
}
</script>

<template>
  <header class="w-full h-14   shadow-xs flex items-center justify-between px-4">
    <!-- 左侧 Logo -->
    <div class="flex items-center gap-2">
      <img class="h-8 w-8 md:h-10 md:w-10" src="/logo.jpeg" alt="Logo"/>
      <div class="">Turtle后台管理系统</div>
    </div>

    <!-- 右侧导航 -->
    <nav class="flex items-center space-x-4 gap-2 ">
      <UButton
          size="md"
          variant="ghost"
          @click="logout">退出登陆
      </UButton>
    </nav>
  </header>
</template>

