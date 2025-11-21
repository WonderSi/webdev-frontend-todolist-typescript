<template>
  <AuthLayout :error="error">
    <template #form>
      <h1>Login</h1>

      <form @submit.prevent="handleLogin">
        <FormInput
          id="email"
          label="Email"
          v-model="email"
          placeholder="your@email.com"
          autocomplete="email"
          :disabled="isLoading"
          :hasError="errors.email"
        />

        <PasswordInput
          id="password"
          label="Password"
          v-model="password"
          placeholder="••••••••"
          autocomplete="current-password"
          :disabled="isLoading"
          :hasError="errors.password"
        />

        <SubmitButton
          :text="isLoading ? 'Logging in...' : 'Login'"
          :disabled="isLoading"
        />
      </form>

      <AuthLink
        message="Don't have an account?"
        linkText="Register here"
        to="/register"
      />
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/useUserStore'
  import { validateLoginForm, handleLoginError } from '@/utils/validation/login'
  import { useErrorHandler } from '@/utils/useErrorHandler'
  import AuthLayout from '@/components/auth/AuthLayout.vue'
  import FormInput from '@/components/auth/FormInput.vue'
  import PasswordInput from '@/components/auth/PasswordInput.vue'
  import SubmitButton from '@/components/auth/SubmitButton.vue'
  import AuthLink from '@/components/auth/AuthLink.vue'

  const router = useRouter()
  const userStore = useUserStore()

  const email = ref<string>('')
  const password = ref<string>('')
  const isLoading = ref<boolean>(false)

  const { error, errors, setError, clearErrors } = useErrorHandler()

  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms))

  async function handleLogin() {
    clearErrors()

    const validation = validateLoginForm(email.value, password.value)

    if (!validation.isValid) {
      setError(validation.error || '', validation.field)
      return
    }

    isLoading.value = true

    try {
      await userStore.login(email.value, password.value)
      await delay(800)
      await router.push('/')
    } catch (e) {
      const errorInfo = handleLoginError(e)
      setError(errorInfo.message, errorInfo.field)
    } finally {
      isLoading.value = false
    }
  }
</script>

<style scoped lang="scss"></style>
