<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :class="{ 'input-error': hasError }"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    id: string
    label: string
    type?: string
    modelValue: string
    placeholder?: string
    autocomplete?: string
    disabled?: boolean
    hasError?: boolean
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()
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
  }

  .input-error {
    border-color: var(--error-red) !important;
    background-color: var(--error-bg) !important;
  }
</style>
