<template>
  <p class="auth-link">
    {{ message }}
    <router-link :to="to">{{ linkText }}</router-link>
  </p>
</template>

<script setup lang="ts">
  // ======= PROPS =======

  defineProps<{
    message: string
    linkText: string
    to: string
  }>()
</script>

<style scoped lang="scss">
  .auth-link {
    margin-top: 20px;
    text-align: center;
    color: var(--text);
    font-size: 14px;

    a {
      color: var(--button);
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
