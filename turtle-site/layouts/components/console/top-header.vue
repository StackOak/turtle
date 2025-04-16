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
  <header class="w-full h-14 bg-[#40485B] shadow-xs flex items-center justify-between px-4">
    <!-- 左侧 Logo -->
    <NuxtLink to="/console">
      <div class="flex items-center gap-2 cursor-pointer">
        <img class="h-8 w-8 md:h-10 md:w-10" src="/logo.jpeg" alt="Logo"/>
        <div class="text-white text-base font-bold">Turtle</div>
      </div>
    </NuxtLink>

    <!-- 右侧导航 -->
    <nav class="flex items-center space-x-4 gap-2">
      <NuxtLink to="/" target="_blank">
        <UIcon name="i-ion:navigate-outline" class=" text-white text-base font-bold cursor-pointer"/>
      </NuxtLink>
      <div class="flex flex-row items-center">
        <UButton
            size="md"
            variant="ghost"
            class="text-white text-base font-bold cursor-pointer"
            @click="logout">退出
        </UButton>
        <img class="w-8 h-8 rounded-full cursor-pointer" src="/logo.jpeg"/>
      </div>
    </nav>
  </header>
</template>

