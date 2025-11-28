<template>
  <AuthLayout :error="error">
    <template #form>
      <h1>Register</h1>

      <form @submit.prevent="handleRegister">
        <FormInput
          id="email"
          label="Email"
          v-model="email"
          placeholder="your@email.com"
          :disabled="isLoading"
          :hasError="errors.email"
        />

        <PasswordInput
          id="password"
          label="Password"
          v-model="password"
          placeholder="••••••••"
          :disabled="isLoading"
          :hasError="errors.password"
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          v-model="confirmPassword"
          placeholder="••••••••"
          :disabled="isLoading"
          :hasError="errors.confirmPassword"
        />

        <SubmitButton
          :text="isLoading ? 'Registering...' : 'Register'"
          :disabled="isLoading"
        />
      </form>

      <AuthLink
        message="Already have an account?"
        linkText="Login here"
        to="/login"
      />
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/useUserStore'
  import {
    validateRegistrationForm,
    handleRegistrationError
  } from '@/utils/validation/register'
  import { useErrorHandler } from '@/utils/useErrorHandler'
  import AuthLayout from '@/components/auth/AuthLayout.vue'
  import FormInput from '@/components/auth/FormInput.vue'
  import PasswordInput from '@/components/auth/PasswordInput.vue'
  import SubmitButton from '@/components/auth/SubmitButton.vue'
  import AuthLink from '@/components/auth/AuthLink.vue'

  // ======= STATE ========

  const router = useRouter()
  const userStore = useUserStore()

  const email = ref<string>('')
  const password = ref<string>('')
  const confirmPassword = ref<string>('')
  const isLoading = ref<boolean>(false)

  // ======= ERROR HANDLING ========

  const { error, errors, setError, clearErrors } = useErrorHandler()

  // ======= HELPERS ========

  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms))

  // ======= ACTIONS ========

  async function handleRegister() {
    clearErrors()

    const validation = validateRegistrationForm(
      email.value,
      password.value,
      confirmPassword.value,
      userStore.users
    )

    if (!validation.isValid) {
      setError(validation.error || '', validation.field)
      return
    }

    isLoading.value = true

    try {
      await userStore.register(email.value, password.value)
      await delay(800)
      await router.push('/')
    } catch (e) {
      const errorInfo = handleRegistrationError(e)
      setError(errorInfo.message, errorInfo.field)
    } finally {
      isLoading.value = false
    }
  }
</script>

<style scoped lang="scss"></style>
