import eslintConfigLove, { rules } from 'eslint-config-love'

export default [
  {
    files: ['**/*.js', '**/*.ts'],
    rules: {
      '@typescript-eslint/class-methods-use-this': 'off'
    },
    ...eslintConfigLove
  }
]
