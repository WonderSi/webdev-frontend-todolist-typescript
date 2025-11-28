<template>
  <li
    class="task-item"
    :class="{
      'task-item--completed': task.completed,
      'task-item--removing': isRemoving
    }"
  >
    <input
      type="checkbox"
      class="task-item__checkbox"
      :id="task.id"
      :checked="task.completed"
      @change="$emit('toggle', task.id)"
    />
    <div class="task-item__content">
      <span v-if="!isEditing" :for="task.id" class="task-item__span">
        {{ task.text }}
      </span>
      <input
        v-else
        type="text"
        class="task-item__edit-input"
        v-model="editText"
        ref="editInput"
        @blur="saveEdit"
        @keydown.enter="saveEdit"
        @keydown.esc="cancelEdit"
      />
    </div>
    <div class="task-item__actions">
      <button
        class="task-item__action task-item__action--edit"
        aria-label="Edit"
        @click="startEdit"
      >
        <EditIcon />
      </button>
      <button
        class="task-item__action task-item__action--delete"
        aria-label="Delete"
        @click="deleteTask"
      >
        <DeleteIcon />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue'
  import DeleteIcon from '@cmp/icons/DeleteIcon.vue'
  import EditIcon from '@cmp/icons/EditIcon.vue'
  import type { Task } from '@/types/todo-types'

  // ====== PROPS =======

  const props = defineProps<{
    task: Task
  }>()

  // ====== EMITS =======  

  const emit = defineEmits<{
    (e: 'toggle', id: string): void
    (e: 'delete', id: string): void
    (e: 'edit', payload: { id: string; newText: string }): void
  }>()

  // ====== STATE =======

  const isEditing = ref<boolean>(false)
  const isRemoving = ref<boolean>(false)
  const editText = ref<string>('')
  const editInput = ref<HTMLInputElement | null>(null)

  // ====== ACTIONS =======

  function startEdit() {
    if (props.task.completed) {
      alert('The change is not available!')
      return
    }

    isEditing.value = true
    editText.value = props.task.text

    nextTick(() => {
      if (editInput.value) {
        editInput.value.focus()
        const length = editText.value.length
        editInput.value.setSelectionRange(length, length)
      }
    })
  }

  function saveEdit() {
    const newText = editText.value.trim()
    if (newText) {
      emit('edit', { id: props.task.id, newText })
    }
    isEditing.value = false
  }

  function cancelEdit() {
    editText.value = props.task.text
    isEditing.value = false
  }

  function deleteTask() {
    isRemoving.value = true
    setTimeout(() => {
      emit('delete', props.task.id)
    }, 300)
  }
</script>

<style scoped lang="scss">
  .task-item {
    display: flex;
    align-items: center;
    padding-block: 17px;
    padding-inline: 3px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    gap: 17px;

    &__checkbox {
      width: 26px;
      height: 26px;
      border-radius: 4px;
      cursor: pointer;
      flex-shrink: 0;
      &:checked {
        accent-color: var(--button);
        &:hover {
          accent-color: var(--button-focus);
        }
      }
      &:focus {
        box-shadow: none;
      }
    }

    &__content {
      flex: 1;
      min-width: 0;
      display: block;
      position: relative;
      height: 36px;
    }

    &__span,
    &__edit-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 8px 12px;
      margin: 0;
      font-family: 'Kanit', 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      box-sizing: border-box;
      border-radius: 6px;
      border: 0.5px solid transparent;
      background-color: transparent;
      color: var(--text);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      padding-top: calc((36px - 20px) / 2);
      padding-bottom: calc((36px - 20px) / 2);
    }

    &__span {
      cursor: default;
    }

    &__edit-input {
      background-color: var(--bg);
      padding-left: 12px;
      padding-right: 12px;

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px var(--input-shadow);
        border-color: var(--input-shadow);
      }
    }

    &__actions {
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    }

    &__action {
      background: none;
      border: none;
      color: var(--icon-gray-color);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;

      svg {
        width: 18px;
        height: 18px;
      }

      &--edit {
        &:hover {
          color: var(--icon-purple);
        }
      }
      &--delete {
        &:hover {
          color: var(--icon-red);
        }
      }
    }

    &--completed {
      .task-item__span {
        color: var(--text-crossed);
        text-decoration: line-through;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    &--removing {
      transform: translateX(100%);
      opacity: 0;
      max-height: 0;
      padding: 0;
      margin: 0;
    }

    button {
      opacity: 0;
    }

    &:hover {
      button {
        opacity: 1;
      }
    }

    @include tablet {
      &__span,
      &__edit-input {
        max-width: 375px;
        padding: 6px 10px;
        min-height: 34px;
      }
    }

    @include mobile {
      &__span,
      &__edit-input {
        max-width: 200px;
        font-size: 14px;
        padding: 5px 8px;
        min-height: 32px;
      }
    }
  }
</style>
