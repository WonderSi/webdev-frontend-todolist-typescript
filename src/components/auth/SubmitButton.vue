<template>
  <button type="submit" class="btn-primary" :disabled="disabled">
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
  // ======= PROPS =======

  defineProps<{
    text: string
    disabled?: boolean
  }>()
</script>

<style scoped lang="scss">
  .btn-primary {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: 500;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
</style>
