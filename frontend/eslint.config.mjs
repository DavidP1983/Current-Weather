import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'build', '.config'],
  },

  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactYouMightNotNeedAnEffect.configs.recommended,
    ],

    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      'react-hooks': reactHooks,
      unicorn: eslintPluginUnicorn,
      reactYouMightNotNeedAnEffect: reactYouMightNotNeedAnEffect,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/set-state-in-effect': 'off',
      'react-you-might-not-need-an-effect/no-adjust-state-on-prop-change':
        'off',
      'no-console': 'warn',
      'prefer-const': 'error',
      curly: ['error', 'all'],
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/prefer-array-find': 'warn',
      'unicorn/prefer-includes': 'warn',
      'unicorn/no-useless-undefined': 'warn',

      'unicorn/template-indent': [
        'error',
        {
          tags: ['styled', 'html'],
          indent: 8,
          functions: ['dedent', 'stripIndent'],
          selectors: [],
          comments: ['indent', 'HTML'],
        },
      ],
      'reactYouMightNotNeedAnEffect/no-derived-state': 'warn',
    },
  }
);
