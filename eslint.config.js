import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'
export default defineConfig([
 globalIgnores(['dist','.next','next-env.d.ts']),
 js.configs.recommended,
 tseslint.configs.recommended,
 {files:['**/*.{ts,tsx,js}'],languageOptions:{globals:globals.browser},plugins:{'react-hooks':reactHooks},rules:{...reactHooks.configs.recommended.rules}},
])
