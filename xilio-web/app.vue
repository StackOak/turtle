<template>
  <UApp>
    <NuxtLayout :name="layout">
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts">

const route = useRoute()


const layout = computed(() => {
  if (route.path.startsWith('/console/editor')||route.path.startsWith('/console/login')) {
    return 'root'
  } else if (route.path.startsWith('/console')) {
    return 'console-default'
  } else {
    return 'site-default'
  }
})
</script>
<style>
*,
*::before,
*::after {
  margin: 0;
}

body {

}

</style>
