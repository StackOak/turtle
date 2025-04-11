<template>
  <div class="flex flex-col w-full gap-2 pt-2 fixed">
    <div class="flex flex-row justify-between items-center w-full pl-4 pr-15">
      <div class="flex-1 min-w-0 pr-10">  <!-- 修改这里 -->
        <UInput
            v-model="title"
            :maxlength="maxLength"
            size="xl"
            variant="soft"
            class="w-full"
            placeholder="输入一个简短的标题"
            aria-describedby="character-count"
            :ui="{ trailing: 'pointer-events-none' }"
        >
          <template #trailing>
            <div
                id="character-count"
                class="text-xs text-(--ui-text-muted) tabular-nums"
                aria-live="polite"
                role="status">
              {{ title?.length }}/{{ maxLength }}
            </div>
          </template>
        </UInput>
      </div>
      <div class="flex items-center gap-4">  <!-- 修改这里 -->
        <UButton color="info">草稿</UButton>
        <UButton>立即发布</UButton>
      </div>
    </div>
    <TurtleEditor/>
  </div>

</template>

<script setup lang="ts">
import TurtleEditor from '@/components/TurtleEditor.vue'

const title = ref('')
const maxLength = 100
</script>

<style>


</style>
