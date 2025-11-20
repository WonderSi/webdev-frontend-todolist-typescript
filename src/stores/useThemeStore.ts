import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const currentTheme = ref<Theme>('light')

    function init() {
      const savedTheme = localStorage.getItem('todoTheme') as Theme | null
      if (savedTheme) {
        currentTheme.value = savedTheme
        applyTheme(savedTheme)
      } else {
        applyTheme('light')
      }
    }

    function applyTheme(theme: Theme) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('todoTheme', theme)
      currentTheme.value = theme
    }

    function toggleTheme() {
      const newTheme: Theme = currentTheme.value === 'dark' ? 'light' : 'dark'
      applyTheme(newTheme)
    }

    function getCurrentTheme(): Theme {
      return currentTheme.value
    }

    return {
      currentTheme,
      init,
      toggleTheme,
      getCurrentTheme
    }
  },
  {
    persist: {
      key: 'todo-theme',
      pick: ['currentTheme']
    }
  }
)
