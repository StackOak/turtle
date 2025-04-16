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
  <div class=" w-full h-12 bg-gray-100">
      <div class="flex flex-row justify-end pt-2">
        <div>
          <UButton @click="logout">退出</UButton>
        </div>
      </div>
  </div>

</template>

