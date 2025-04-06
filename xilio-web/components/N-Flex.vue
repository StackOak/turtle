<!-- components/NFlex.vue -->
<template>
  <div class="n-flex" :style="flexStyles">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  // 控制主轴对齐方式
  justify: {
    type: String,
    default: 'flex-start',
    validator: (value) => [
      'flex-start',
      'flex-end',
      'center',
      'space-between',
      'space-around',
      'space-evenly'
    ].includes(value)
  },
  // 控制交叉轴对齐方式
  align: {
    type: String,
    default: 'stretch',
    validator: (value) => [
      'flex-start',
      'flex-end',
      'center',
      'stretch',
      'baseline'
    ].includes(value)
  },
  // 间距
  gap: {
    type: [Number, String],
    default: 0
  },
  // 方向
  direction: {
    type: String,
    default: 'row',
    validator: (value) => [
      'row',
      'row-reverse',
      'column',
      'column-reverse'
    ].includes(value)
  },
  // 是否换行
  wrap: {
    type: Boolean,
    default: false
  },
  // 新增：垂直布局快捷属性
  vertical: {
    type: Boolean,
    default: false
  }
})

// 计算样式
const flexStyles = computed(() => ({
  display: 'flex',
  'justify-content': props.justify,
  'align-items': props.align,
  gap: typeof props.gap === 'number' ? `${props.gap}rem` : props.gap,
  'flex-direction': props.vertical ? 'column' : props.direction,
  'flex-wrap': props.wrap ? 'wrap' : 'nowrap',
}))
</script>

<style scoped>
.n-flex {
  box-sizing: border-box;
}
</style>
