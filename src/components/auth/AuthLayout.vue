<template>
  <div class="auth-page">
    <div class="auth-page__overlay"></div>
    <div class="auth-page__content">
      <div class="auth-page__card">
        <slot name="form" />
      </div>

      <ErrorMessage :error="error" />

      <p class="about-link">
        <router-link to="/about">About</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ErrorMessage from './ErrorMessage.vue'

  // ======= PROPS =======

  defineProps<{
    error?: string
  }>()
</script>

<style scoped lang="scss">
  .auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: -1000;
    }

    &__content {
      display: flex;
      flex-direction: column;
    }

    &__card {
      background: var(--bg);
      padding: 40px;
      border-radius: 12px;
      width: 100%;
      max-width: 400px;

      h1 {
        margin-bottom: 30px;
        text-align: center;
        color: var(--text);
      }
    }
  }

  .about-link {
    position: absolute;
    bottom: 1em;
    left: 1em;

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
