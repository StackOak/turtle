<template>
  <UApp>
    <NuxtLayout :name="layout">
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts">

const route = useRoute()
const layout = computed(() => route.path.startsWith('/console') ? "console-default" : "site-default")
</script>
<style>
*,
*::before,
*::after {
  margin: 0;
}


body {
  padding: 0 12%;

}

</style>
