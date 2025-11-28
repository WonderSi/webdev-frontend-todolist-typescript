<template>
  <main class="todo-list">
    <ul class="todo-list__tasks" v-show="sortedTasks.length > 0">
      <TodoItem
        v-for="task in sortedTasks"
        :key="task.id"
        :task="task"
        @toggle="handleToggle"
        @delete="handleDelete"
        @edit="handleEdit"
      />
    </ul>
    <div class="todo-list__empty" v-show="todoStore.filteredTasks.length === 0">
      <EmptyIcon />
      <p class="todo-list__empty-text">Empty...</p>
    </div>
    <AddButton @click="handleAddButtonClick" />
    <AddTaskModal
      :open="modalOpen"
      @close="modalOpen = false"
      @add-task="addTask"
    />
  </main>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useTodoStore } from '@/stores/useTodoStore'
  import TodoItem from '@cmp/todo/TodoItem.vue'
  import AddButton from '@cmp/todo/AddButton.vue'
  import AddTaskModal from '@cmp/todo/AddTaskModal.vue'
  import EmptyIcon from '@cmp/icons/EmptyIcon.vue'
  import type { EditPayload, FilterType } from '@/types/todo-types'

  // ====== STATE =======

  const todoStore = useTodoStore()
  const modalOpen = ref<boolean>(false)

  // ====== COMPUTED =======

  const sortedTasks = computed(() => {
    return [...todoStore.filteredTasks].sort((a, b) => {
      return Number(a.completed) - Number(b.completed)
    })
  })

  // ====== ACTIONS =======

  function handleAddButtonClick() {
    modalOpen.value = true
  }

  function addTask(text: string) {
    todoStore.addTask(text)
  }

  function handleToggle(taskId: string) {
    todoStore.toggleTask(taskId)
  }

  function handleDelete(taskId: string) {
    todoStore.deleteTask(taskId)
  }

  function handleEdit(payload: EditPayload) {
    todoStore.editTask(payload.id, payload.newText)
  }

  function setSearchQuery(query: string) {
    todoStore.setSearchQuery(query)
  }

  function setFilter(filter: FilterType) {
    todoStore.setFilter(filter)
  }

  // ====== EXPOSE =======

  defineExpose({
    setSearchQuery,
    setFilter
  })
</script>

<style scoped lang="scss">
  .todo-list {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding-inline: 115px;
    height: 50vh;

    &__tasks {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: none;
      li {
        border-bottom: 1px solid #6b63ff50;
        &:last-child {
          border: none;
        }
      }
    }

    &__empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
    }

    &__empty-text {
      margin-top: 20px;
      font-weight: 400;
      font-size: 20px;
      color: var(--text);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  @include tablet {
    .todo-list {
      padding-inline: 75px;

      &__empty {
        margin-top: 0px;

        svg {
          transform: scale(0.7);
        }
      }

      &__empty-text {
        margin-top: 0px;
      }
    }
  }

  @include mobile {
    .todo-list {
      padding-inline: 25px;

      &__empty {
        margin-top: 0px;

        svg {
          transform: scale(0.8);
        }
      }

      &__empty-text {
        margin-top: 0px;
        font-size: 16px;
      }
    }
  }
</style>
