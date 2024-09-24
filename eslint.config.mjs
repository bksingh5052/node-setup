import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node  // Add Node.js globals like `module`, `require`, etc.
      },
      ecmaVersion: 2021, // Optional: Ensure you're using modern ECMAScript features
    }
  },
  pluginJs.configs.recommended , eslintConfigPrettier,
  {
    rules: {
      'no-console': 'error',
      'no-useless-catch': 0,
      quotes: ['error', 'single', { allowTemplateLiterals: true }]
    }
  },
];
