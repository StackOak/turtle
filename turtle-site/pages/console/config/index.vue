<script setup lang="ts">
import {API} from "~/composables/api";

const toast = useToast();
onMounted(() => {
  loadConfig()
})
const configs = ref('{}')
const loadConfig = async () => {
  const res = await <any>Https.action(API.CONFIG.get)
  configs.value = JSON.stringify(res.data, null, 2)
}
const saveConfig = async () => {
  try {
    if (configs.value.trim() === '') return;
    const parsedConfig = JSON.parse(configs.value);
    await Https.action(API.CONFIG.save, {
      body: parsedConfig
    })
    toast.add({title: '更新成功', color: 'success'});
  } catch (err) {
    console.log(err)
    toast.add({title: '保存失败: JSON 格式错误或网络问题', color: 'error'});
  }
}
</script>

<template>
  <div class="w-full flex flex-col  pt-2 gap-4">
    <UTextarea class="w-full font-mono" v-model="configs" color="neutral" variant="soft" size="xl" autoresize/>
    <div class="flex justify-center">
      <UButton @click="saveConfig">更新配置</UButton>
    </div>
  </div>
</template>

