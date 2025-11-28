<template>
  <button class="add-button" @click="$emit('click')">
    <PlusIcon />
  </button>
</template>

<script setup lang="ts">
  import PlusIcon from '@cmp/icons/PlusIcon.vue'
</script>

<style scoped lang="scss">
  .add-button {
    position: absolute;
    bottom: 3%;
    right: 1%;
    background-color: var(--button);
    color: var(--button-text);
    box-shadow: 0px 0px 4px 0px var(--button);
    border: 2px solid transparent;
    border-radius: 50%;
    padding: 13px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      background-color: var(--button-focus);
      border-color: var(--button);
    }
    svg {
      @include flex-center();
    }
  }

  @include mobile {
    .add-button {
      padding: 5px;

      svg {
        transform: scale(0.8);
      }
    }
  }
</style>
