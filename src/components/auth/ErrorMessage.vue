<template>
  <div class="error">
    <Transition name="fade">
      <div v-if="error" class="error__message">
        {{ error }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    error?: string
  }>()
</script>

<style scoped lang="scss">
  .error {
    display: flex;
    justify-content: center;
    min-height: 43px;
    margin-top: 15px;
    margin-inline: 30px;

    &__message {
      width: fit-content;
      padding: 10px;
      background: var(--error-bg);
      border: 1px solid var(--error-red);
      border-radius: 6px;
      color: var(--error-red);
      text-align: center;
      font-size: 14px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
