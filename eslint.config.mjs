import eslintConfigLove, { rules } from 'eslint-config-love'

export default [
  {
    files: ['**/*.js', '**/*.ts'],
    ...eslintConfigLove
  }
]
