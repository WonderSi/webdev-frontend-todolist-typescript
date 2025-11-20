import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/files-to-ignore',
    ignores: ['*.d.ts', '**/coverage/**', '**/dist/**']
  },
  {
    name: 'app/language-options',
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },

  js.configs.recommended,

  ...pluginVue.configs['flat/essential'],

  ...vueTsEslintConfig(),

  skipFormatting,

  {
    name: 'app/custom-rules',
    files: ['**/*.{ts,vue}'],
    rules: {}
  }
])
