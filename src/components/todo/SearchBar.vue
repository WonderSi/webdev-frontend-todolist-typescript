<template>
  <div class="search-bar">
    <input
      type="text"
      class="search-bar__input"
      placeholder="Search note..."
      v-model="todoStore.searchQuery"
    />
    <button class="search-bar__submit">
      <SearchIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useTodoStore } from '@/stores/useTodoStore'
  import SearchIcon from '@cmp/icons/SearchIcon.vue'

  const todoStore = useTodoStore()
</script>

<style scoped lang="scss">
  .search-bar {
    position: relative;
    width: 595px;

    &__submit {
      position: absolute;
      top: 18%;
      right: 2%;
      color: var(--input);
      border: none;
      background: none;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  @include tablet {
    .search-bar {
      width: 425px;

      &__submit {
        right: 3%;
      }
    }
  }

  @include mobile {
    .search-bar {
      width: 280px;
      &__input {
        font-size: 12px;
      }

      &__submit {
        top: 15%;
        right: 4%;
      }
    }
  }
</style>
