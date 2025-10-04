import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

export default defineConfig(
    eslint.configs.recommended,
    typescriptEslint.configs.recommended,
    eslintPluginVue.configs['flat/recommended'],
    { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
    {
        files: ['**/*.{ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                parser: typescriptEslint.parser
            }
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: 'axe-core',
                            allowTypeImports: true
                        }
                    ]
                }
            ]
        }
    },
    eslintConfigPrettier
)
