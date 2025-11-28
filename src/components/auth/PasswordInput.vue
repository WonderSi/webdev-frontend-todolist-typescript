<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <div class="form-group__password-wrapper">
      <input
        :id="id"
        :type="showPassword ? 'text' : 'password'"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :class="{ 'input-error': hasError }"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
      <button
        type="button"
        class="show-password-btn"
        @click="togglePassword"
        :disabled="disabled"
        tabindex="-1"
      >
        <EyeOpenIcon v-if="showPassword" />
        <EyeClosedIcon v-else />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import EyeOpenIcon from '../icons/EyeOpenIcon.vue'
  import EyeClosedIcon from '../icons/EyeClosedIcon.vue'

  // ======= PROPS =======

  defineProps<{
    id: string
    label: string
    modelValue: string
    placeholder?: string
    autocomplete?: string
    disabled?: boolean
    hasError?: boolean
  }>()

  // ======= EMITS =======

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  // ======= STATE =======

  const showPassword = ref<boolean>(false)

  // ======= ACTIONS =======

  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
</script>

<style scoped lang="scss">
  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      color: var(--text);
      font-weight: 500;
    }

    &__password-wrapper {
      position: relative;

      input {
        padding-right: 45px;
      }

      .show-password-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        font-size: 18px;
        padding: 5px;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
  .input-error {
    border-color: var(--error-red) !important;
    background-color: var(--error-bg) !important;
  }
  .eye-icon {
    color: var(--text);
  }
</style>
