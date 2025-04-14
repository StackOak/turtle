<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const data=ref()
  const load=async ()=>{
 const res=await Https.action(API.CONFIG.get)
    const baseURL = runtimeConfig.public.adminApiBase
 //   const res=await $fetch( "http://192.168.0.151:8000/config/get")
    data.value=res
  }
</script>

<template>
  {{data}}
 <div>
   <UButton @click="load">load</UButton>
 </div>
</template>

<style scoped>

</style>
